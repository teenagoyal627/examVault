const express = require('express')
const { NotesData, UserData } = require('../modal/modal')
const router = express.Router()
const { v4: uuidv4 } = require('uuid')
const cloudinary = require('cloudinary').v2
const verifyToken = require('../middleWare/jwtToken')
const multer = require('multer')
const { Readable } = require('stream')
const file_type = require('../modal/fileType')
const path = require('path')


cloudinary.config({
  cloud_name: 'dpw3l4137',
  api_key: '686692581973185',
  api_secret: 'gBy0iYWL1NXWzvdO0xYbV2c4LkM'
})

const uploadNotesUrl = multer({ storage: multer.memoryStorage() })

router.post('/upload_notes', verifyToken, uploadNotesUrl.single('file'), async (req, res) => {
  const { uid } = req
  console.log("Request body",req.body)
  console.log("File",req.file)
  try {
    if (!req.file) {
      console.log("file not received")
      return res.status(400).json({ message: "No File Uploaded" })
    }
    console.log("file received")
    const ext = path.extname(req.file.originalname).toLowerCase().replace('.', '')
    if (!file_type.includes(ext)) {
      return res.status(400).json({ message: `Invalid file type. Allowed: ${file_type.join(', ')}` })
    }

    const user = await UserData.findOne({ user_id: uid })
    const { user_approval_status, name } = user
    const userName = name
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
            if (error) {reject(error)}
            else{
              resolve(result)
              console.log(result)
            } 
            
          }
        )
        Readable.from(buffer).pipe(stream)
      })
    }

    const uploadResponse = await uploadToCloudinary(req.file.buffer)
    const file_url = uploadResponse.secure_url

    const newNotes = new NotesData({
      user_id: uid,
      uploaded_by: userName,
      subject: req.body.subject,
      year: req.body.year,
      semester: req.body.semester,
      department: req.body.department,
      unit_no: req.body.unit_no,
      file_url: file_url
    })
    await newNotes.save()
    return res.status(200).json({ success: true, message: 'Notes Successfully Uploaded' })

  } catch (error) {
    res.status(500).json({ error: 'server error', error })
  }
})


router.get('/all_notes',async(req,res)=>{
  try{
    const allNotes=await NotesData.aggregate([
      {
        $addFields:{
          download_count:{
            $size:{$ifNull:["$download_user_ids",[]]}
          }
        }
      },{
        $sort:{created_at:-1}
      }
    ])
    res.json(allNotes)


  }catch(error){
    res.status(500).json({
      error:'server error'
    })
  }
})


router.get('/get_notes/:id', async (req, res) => {
  const { id } = req.params
  await NotesData.findById(id)
    .then(notes => res.status(200).json(notes))
    .catch(error =>
      res.status(500).json({ message: 'Error while updating the paper', error })
    )
})



const uploadEditNotes=multer()
router.put('/edit_paper/:id',uploadEditNotes.none(),async (req, res) => {
  const { id } = req.params
  const {department, subject, year, semester,role, approved_by} =req.body
  try {
    const updateFields={
      department,
      subject,
      year,
      semester,
      updated_at: Date.now(),
    }

    const updatedNotes = await NotesData.findByIdAndUpdate(
      id,
      updateFields,
      {new:true}
    )
    if (!updatedNotes) {
      return res.status(404).json({ message: 'Notes not found' })
    }
    else{
      res.status(200).json({ message: 'Notes updated successfully', updatedPaper })
    }
  } catch (error) {
    res.status(500).json({ message: 'Error while updating the notes', error })
  }
})


router.get('/my_notes', async (req, res) => {
  try {
    const { uid } = req.query
    if (!uid) {
      return res.status(400).json({ error: 'User ID is required' })
    }
    const notes = await NotesData.find({ user_id: uid}).sort({created_at: -1})
    res.json(notes)
  } catch (error) {
    res.status(500).json({ error: 'internal server error' })
  }
})

module.exports = router