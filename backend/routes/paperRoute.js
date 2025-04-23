const express = require('express')
const { PaperData,generateNGrams, UserData } = require('../modal/modal')
const router = express.Router()
const { v4: uuidv4 } = require('uuid')
const cloudinary = require('cloudinary').v2
const verifyToken = require('../middleWare/jwtToken')
const multer = require('multer')
const { Readable } = require('stream')
const file_type=require('../modal/fileType')
const path=require('path')

cloudinary.config({
  cloud_name: 'dpw3l4137',
  api_key: '686692581973185',
  api_secret: 'gBy0iYWL1NXWzvdO0xYbV2c4LkM'
})

const uploadPaperUrl = multer({ storage: multer.memoryStorage() })

router.post('/upload_paper',verifyToken,uploadPaperUrl.single('file'),async (req, res) => {
  console.log("paper is uploading ")

    const { uid } = req
    try {
      if (!req.file) {
        console.log("❗ No file received");
        return res.status(400).json({ message: 'No File Uploaded.' })
      }
      console.log("🟢 File received:", req.file.originalname);
      const ext=path.extname(req.file.originalname).toLowerCase().replace('.','')
      if(!file_type.includes(ext)){
        return res.status(400).json({message:`Invalid file type. Allowed: ${file_type.join(', ')}`})
      }

      const user = await UserData.findOne({ user_id: uid })
      console.log(user)
      const { role, name, user_approval_status } = user
      const userName=name

      if (user_approval_status !== 'Approved') {
        return res.status(403).json({
            message: 'You are not approved by admin. Please contact to admin...'
          })
      }

      const uniqueFileName = uuidv4()
      
      const uploadToCloudinary = buffer => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              resource_type: 'raw',
              folder: `${uid}`,
              public_id: uniqueFileName,
              // format: 'pdf'
            },
            (error, result) => {
              if (error) reject(error)
              else resolve(result)
            {console.log("error",error)}
            {console.log(result, error)}
            }
          )
          Readable.from(buffer).pipe(stream)
        })
      }

      const uploadResponse = await uploadToCloudinary(req.file.buffer)
      console.log(uploadResponse)
      const file_url = uploadResponse.secure_url
      console.log('Uploading PDF URL:', file_url);


      let paper_approval_status = 'Pending'
      let paper_approval_at = null
      let paper_approved_by = null
      let paper_comment = 'no comment'
      let paper_updated_at = null

      if (role === 'teacher') {
        paper_approval_status = 'Approved'
        paper_approval_at = Date.now()
        paper_approved_by = name
      }

      const newPaper = new PaperData({
        user_id: uid,
        uploaded_by:userName,
        title:req.body.title,
        subject: req.body.subject,
        paper_type: req.body.paper_type,
        exam_type: req.body.exam_type,
        year: req.body.year,
        semester: req.body.semester,
        department: req.body.department,
        paper_approval_status,
        approval_at: paper_approval_at,
        approved_by: paper_approved_by,
        comment: paper_comment,
        updated_at: paper_updated_at,
        deleted: false,
        file_url: file_url,

      })

      await newPaper.save()
      return res.status(200).json({ success: true, message: 'Paper successfully uploaded...' })
    } catch (error) {
      // console.log(error)
      res.status(500).json({ error: 'server error', error })
    }
  }
)

router.get('/my_paper', async (req, res) => {
  console.log("mypapaer")
  try {
    const { uid } = req.query
    if (!uid) {
      return res.status(400).json({ error: 'User ID is required' })
    }
    const papers = await PaperData.find({ user_id: uid, deleted: false }).sort({created_at: -1})
    res.json(papers)
    console.log(papers.file_url)
  } catch (error) {
    res.status(500).json({ error: 'internal server error' })
  }
})

router.get('/all_paper', async (req, res) => {
  console.log(PaperData)
  console.log("Type of PaperData.aggregate:", typeof PaperData.aggregate);
  try {
    const allPaper=await PaperData.aggregate([
      {
        $match: {
          deleted: false, 
          paper_approval_status: "Approved"
        }
      },      
      {
        $addFields: {
          download_count: {
            $size: { $ifNull: ["$download_user_ids", []] } 
          }
        }
      },
      
      // {
      //   $project: {
      //     download_user_ids: 0
      //   }
      // },
      {
        $sort:{created_at: -1}
      },
  
    ])
    console.log(`✅ Papers fetched: ${allPaper.length}`);
    res.json(allPaper);
  } catch (error) {
    res.status(500).json({
      error: 'Server error',
      details: error.message,
      stack: error.stack
    });
  }
})

router.get('/new_papers',async(req,res)=>{
  try{
    const newPapers=await PaperData.find({
      paper_approval_status:'Pending'
    }).sort({created_at: -1})
    res.json(newPapers)
  }catch(error){
    res.status(500).json({message:"Error while fetching the new paper data."})
  }
})

router.get('/get_paper/:id', async (req, res) => {
  const { id } = req.params
  await PaperData.findById(id)
    .then(paper => res.status(200).json(paper))
    .catch(error =>
      res.status(500).json({ message: 'Error while updating the paper', error })
    )
})


const uploadEditPaper=multer()
router.put('/edit_paper/:id',uploadEditPaper.none(),async (req, res) => {
  const { id } = req.params
  const { title, department, subject, year, semester, paper_type, exam_type,role, approved_by} =req.body
    //  console.log(role)
  try {

    const updateFields={
      title,
      department,
      subject,
      year,
      semester,
      paper_type,
      exam_type,
      updated_at: Date.now(),
      deleted: false,
    }

    if(role==='teacher'){
      updateFields.paper_approval_status="Approved";
      updateFields.approved_by=approved_by
      updateFields.approval_at=Date.now()
    }

    const updatedPaper = await PaperData.findByIdAndUpdate(
      id,
      updateFields,
      {new:true}
    )
      // console.log("updatedPaper",updatedPaper)
    if (!updatedPaper) {
      return res.status(404).json({ message: 'Paper not found' })
    }

    res.status(200).json({ message: 'Paper updated successfully', updatedPaper })
  } catch (error) {
    res.status(500).json({ message: 'Error while updating the paper', error })
  }
})

router.put('/:id/delete', async (req, res) => {
  const { id } = req.params
  await PaperData.findByIdAndUpdate(id, { deleted: true }, { new: true })
    .then(updatedPapers => {
      res.json({ message: 'user marked as deleted' })
    })
    .catch(error => {
      res.status(500).json({ message: 'Failed to mark as deleted', error })
    })
})

router.get('/:id/view_paper', async (req, res) => {
  try {
    const { id } = req.params
    await PaperData.findOne({ _id: id })
      .then(papers => res.status(200).json(papers))
      .catch(error =>
        res.status(404).json({ message: 'Paper not found', error })
      )
  } catch (error) {
    res.status(404).json({ message: error })
  }
})

router.post('/download_papers',verifyToken,async(req,res)=>{
  try{
    const {uid}=req;
    const{paper_id}=req.body;
    // console.log(paper_id)
   await PaperData.findByIdAndUpdate(
    paper_id,
    {$addToSet:{download_user_ids:uid}},
    {new:true}
  )

res.status(200).json({message:"Paper successfullly downloaded"})

  }catch(error){
    res.status(403).json({message:"User is not Authorized"})
  }
})

router.get('/paper_stats', async (req, res) => {
  try {
    const stats = await PaperData.aggregate([
      { $match: { deleted: false } },
      {
        $group: {
          _id: '$paper_approval_status',
          count: { $sum: 1 }
        }
      }
    ])

    const response = {
      pending: stats.find(stat => stat._id === 'Pending')?.count || 0,
      approved: stats.find(stat => stat._id === 'Approved')?.count || 0,
      rejected: stats.find(stat => stat._id === 'Rejected')?.count || 0
    }
    res.status(200).json(response)
  } catch (error) {
    // console.error(error)
    res.status(500).json({ message: 'Error fetching stats' })
  }
})

router.get('/department_stats', async (req, res) => {
  try {
    const stats = await PaperData.aggregate([
      { $match: { deleted: false, paper_approval_status:'Approved' } },
      {
        $group: {
          _id: '$department',
          count: { $sum: 1 }
        }
      }
    ])

    const response = {
      CSE: stats.find(stat => stat._id === 'CSE')?.count || 0,
      ME: stats.find(stat => stat._id === 'ME')?.count || 0,
      EE: stats.find(stat => stat._id === 'EE')?.count || 0,
      CIVIL: stats.find(stat => stat._id === 'CIVIL')?.count || 0,
      Other: stats.find(stat => stat._id === 'Other')?.count || 0
    }
    res.status(200).json(response)
  } catch (error) {
    // console.error(error)
    res.status(500).json({ message: 'Error fetching stats' })
  }
})

router.get('/exam_type_stats', async (req, res) => {
  try {
    const stats = await PaperData.aggregate([
      { $match: { deleted: false, paper_approval_status:'Approved'  } },
      {
        $group: {
          _id: '$exam_type',
          count: { $sum: 1 }
        }
      }
    ])

    const response = {
      University: stats.find(stat => stat._id === 'University')?.count || 0,
      Midterm: stats.find(stat => stat._id === 'Midterm')?.count || 0,
      Improvement: stats.find(stat => stat._id === 'Improvement')?.count || 0,
      Other: stats.find(stat => stat._id === 'Other')?.count || 0

    }
    res.status(200).json(response)
  } catch (error) {
    // console.error(error)
    res.status(500).json({ message: 'Error fetching stats' })
  }
})

router.get('/paper_type_stats', async (req, res) => {
  try {
    const stats = await PaperData.aggregate([
      { $match: { deleted: false,paper_approval_status:'Approved'  } },
      {
        $group: {
          _id: '$paper_type',
          count: { $sum: 1 }
        }
      }
    ])

    const response = {
      Main: stats.find(stat => stat._id === 'Main')?.count || 0,
      Back: stats.find(stat => stat._id === 'Back')?.count || 0,
      Other: stats.find(stat => stat._id === 'Other')?.count || 0
    }
    res.status(200).json(response)
  } catch (error) {
    // console.error(error)
    res.status(500).json({ message: 'Error fetching stats' })
  }
})

const verifyTeacher = (req, res, next) => {
  const userRole = req.user.role
  if (userRole !== 'teacher') {
    return res
      .status(401)
      .json({
        message: 'Access denied. Only teacher can update the paper status.'
      })
  }
  next()
}

router.put('/approve_paper',async (req, res) => {
  try {
    const { paperId, status,approved_by,approval_at} = req.body
    // console.log(approval_at)
    if (!paperId || !status) {
      return res.status(400).json({ message: 'Paper ID and status are required' })
    }
    const paper = await PaperData.findById(paperId)
    paper.paper_approval_status= status
    paper.approved_by=approved_by 
    paper.approval_at=approval_at
    await paper.save()
    res.status(200).json({ message: 'Paper status updated successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error updating paper status' })
  }
})

router.put('/reject_paper',async (req, res) => {
  try {
    const { paperId, status,approved_by,comment} = req.body
    if (!paperId || !status) {
      return res.status(400).json({ message: 'Paper ID and status are required' })
    }
    const paper = await PaperData.findById(paperId)
    paper.paper_approval_status= status
    paper.approved_by=approved_by 
    paper.comment=comment
    await paper.save()
    res.status(200).json({ message: 'Paper status updated successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error updating paper status' })
  }
})

router.get('/search_papers', async (req, res) => {
  try {
    let { title, subject, department, year, semester, paper_type, exam_type } = req.query;  
    // let page=1; 
    // let limit=12
    // page=parseInt(page)
    // limit=parseInt(limit)
    // const skip=(page-1)*limit;
    
    let query={}
    let isTextSearch=false;

    // if (title && title.trim() !== "") {
    //   isTextSearch=true;
    //   query.$or = [
    //     { $text: { $search: title } }, 
    //     { ngrams: { $in: generateNGrams(title.toLowerCase(), 2) } } 
    //   ];
    // }

    if (subject) query.subject = subject;
    if (department) query.department = department;
    if (year) query.year = year;
    if (semester) query.semester = semester;
    if (paper_type) query.paper_type = paper_type;
    if (exam_type) query.exam_type = exam_type;

 console.log(query)

 let aggregationPipeline = [];
       
    // if(title && title.trim()!==""){
    //   aggregationPipeline.push(
    //     {$addFields:{
    //       score:{$meta:"textScore"}}
    //     })
    //     aggregationPipeline.push({ $sort: { createdAt: -1 } })
    // }else{
    //   aggregationPipeline.push({ $sort: { createdAt: -1 } });
    // }

    // const papers = await PaperData.aggregate(aggregationPipeline)
    // console.log(papers)

    if (title && title.trim() !== "") {
      const textSearchQuery = { $text: { $search: title } }
      const ngramSearchQuery = { ngrams: { $in: generateNGrams(title.toLowerCase(), 2) } }
    
      // Use only $text? then allow score
      const isOnlyText = true; // You decide this based on user preference
    
      if (isOnlyText) {
        aggregationPipeline.push({ $match: textSearchQuery })
        // aggregationPipeline.push({ $addFields: { score: { $meta: "textScore" } } })
        aggregationPipeline.push({ $sort: {createdAt: -1 } })
      } else {
        aggregationPipeline.push({ $match: { $or: [textSearchQuery, ngramSearchQuery] } })
        aggregationPipeline.push({ $sort: { createdAt: -1 } }) // no score
      }
    }
    

    if (!papers.length) {
      return res.status(404).json({
        message: 'No search results found.',
        data: []
      });
    }
    else{
      res.status(200).json({
        message: 'Searched papers fetched successfully.',
        data: papers
      })
    }
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred while searching papers.',
      error: error.message
    })
  }
})

module.exports = router



