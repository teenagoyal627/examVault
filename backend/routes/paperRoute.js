const express = require('express')
const { PaperData, UserData } = require('../modal/modal')
const router = express.Router()
const { v4: uuidv4 } = require('uuid')
const cloudinary = require('cloudinary').v2
const verifyToken = require('../middleWare/jwtToken')
const multer = require('multer')
const { Readable } = require('stream')

cloudinary.config({
  cloud_name: 'dpw3l4137',
  api_key: '686692581973185',
  api_secret: 'gBy0iYWL1NXWzvdO0xYbV2c4LkM'
})

const upload = multer({ storage: multer.memoryStorage() })

router.post('/upload_paper',verifyToken,upload.single('file'),async (req, res) => {
    const { uid } = req
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No File Uploaded.' })
      }

      const user = await UserData.findOne({ user_id: uid })
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
              resource_type: 'auto',
              folder: `${uid}`,
              public_id: uniqueFileName
            },
            (error, result) => {
              if (error) reject(error)
              else resolve(result)
            }
          )
          Readable.from(buffer).pipe(stream)
        })
      }

      const uploadResponse = await uploadToCloudinary(req.file.buffer)
      const file_url = uploadResponse.secure_url

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
        file_url: file_url
      })

      await newPaper.save()
      return res.status(200).json({ success: true, message: 'Paper successfully uploaded...' })
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'server error', error })
    }
  }
)

router.get('/my_paper', async (req, res) => {
  try {
    const { uid } = req.query
    if (!uid) {
      return res.status(400).json({ error: 'User ID is required' })
    }
    const papers = await PaperData.find({ user_id: uid, deleted: false }).sort({created_at: -1})
    res.json(papers)
  } catch (error) {
    res.status(500).json({ error: 'internal server error' })
  }
})

router.get('/all_paper', async (req, res) => {
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
      {
        $sort: { created_at: -1 }
      }
      // {
      //   $project: {
      //     download_user_ids: 0
      //   }
      // }
    ]);
    
    res.json(allPaper)
  } catch (error) {
    res.status(500).json({ error: 'error fetching data...' })
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

router.put('/edit_paper/:id', async (req, res) => {
  const { id } = req.params
  const { title, department, subject, year, semester, paper_type, exam_type } =
    req.body
  try {
    const updatedPaper = await PaperData.findByIdAndUpdate(
      id,
      {
        title,
        department,
        subject,
        year,
        semester,
        paper_type,
        exam_type,
        updated_at: Date.now(),
        deleted: false
      },
      { new: true }
    )

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
    console.log(paper_id)
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

router.get('/stats', async (req, res) => {
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
    console.error(error)
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

router.put('/update_paper_status',async (req, res) => {
  try {
    const { paperId, status,approved_by} = req.body
    if (!paperId || !status) {
      return res.status(400).json({ message: 'Paper ID and status are required' })
    }
    const paper = await PaperData.findById(paperId)
    paper.paper_approval_status= status
    paper.approved_by=approved_by 
    // paper.comment=comment
    await paper.save()
    res.status(200).json({ message: 'Paper status updated successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error updating paper status' })
  }
})

router.get('/search_papers', async (req, res) => {
  try {
    const { title } = req.query

    if (!title) {
      return res.status(400).json({
        message: 'Title query parameter is required for searching.'
      })
    }

    const papers = await PaperData.find({
      exam_type: { $regex: title, $options: 'i' }
    })

    res.status(200).json({
      message: 'Searched papers fetched successfully.',
      data: papers
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'An error occurred while searching papers.',
      error: error.message
    })
  }
})

module.exports = router
