const express = require("express");
const { PaperData, UserData } = require("../modal/modal");
const router = express.Router();
const {v4:uuidv4}=require("uuid")
const cloudinary = require("cloudinary").v2;
const verifyToken = require("../middleWare/jwtToken");

// router.post("/upload_paper", verifyToken, async (req, res) => {
//   try {
//     const { uid } = req;
//     const user = await UserData.findOne({ user_id: uid });
//     const role = user.role;
//     const name = user.name;

//     let approval_status = "Pending";
//     let approval_at = null;
//     let approved_by = null;
//     let comment = "no comment";
//     let updated_at = null;

//     if (role === "teacher") {
//       approval_status = "Approved";
//       approval_at = Date.now();
//       approved_by = name;
//     }

//     const { department, subject, year, semester, paper_type, exam_type, file_url } =
//       req.body;

//     const newPaper = new PaperData({
//       user_id: uid,
//       subject,
//       paper_type,
//       exam_type,
//       year,
//       semester,
//       department,
//       approval_status,
//       approval_at,
//       approved_by,
//       comment,
//       updated_at,
//       deleted:false,
//       file_url,
//     });

//     await newPaper.save();
//     res
//       .status(200)
//       .json({ success: true, message: "Paper successfully uploaded..." });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "server error", error });
//   }
// });

// https://console.cloudinary.com/console/c-2075bac6eeb93b296e440ef25ac7c1/media_library/folders/ca0c27372b0956d23a3aa823035d1dc618/asset/c9cb73fcbb5339c9d2e21857e377b0b3/manage/download?view_mode=mosaic&context=manage
// https://res.cloudinary.com/dpw3l4137/image/upload/v1735574688/user_files/EvClGvv9k2UYgL9vgXMaBcvikEC3/b193b3cf-0e7f-48d6-8b3f-8f38b995b8d6.pdf
// file:///home/teena/Downloads/b193b3cf-0e7f-48d6-8b3f-8f38b995b8d6.pdf
const multer = require("multer");
const { Readable } = require("stream");

cloudinary.config({
  cloud_name: "dpw3l4137",
  api_key: "686692581973185",
  api_secret: "gBy0iYWL1NXWzvdO0xYbV2c4LkM",
});

// Multer for handling file uploads
const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload_paper", verifyToken, upload.single("file"), async (req, res) => {
  const { uid } = req; // `uid` from the token
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Generate a unique file name using UUID
    const uniqueFileName = uuidv4();

    // Upload file to Cloudinary with folder and file name
    const uploadToCloudinary = (buffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            resource_type: "auto",
            folder: `user_files/${uid}`, // Folder based on user ID
            public_id: uniqueFileName,   // File name based on UUID
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        Readable.from(buffer).pipe(stream);
      });
    };

    const uploadResponse = await uploadToCloudinary(req.file.buffer);
    const file_url = uploadResponse.secure_url;

    // Save form data and file URL to MongoDB
    const newPaper = new PaperData({
      user_id: uid,
      subject: req.body.subject,
      department: req.body.department,
      year: req.body.year,
      file_url: file_url, // Save Cloudinary file URL
    });

    await newPaper.save();
    res.status(200).json({ success: true, message: "Paper uploaded successfully!" });
  } catch (error) {
    console.error("Error in /upload_paper:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/my_paper", async (req, res) => {
  try {
    const { uid } = req.query;
    if (!uid) {
      return res.status(400).json({ error: "User ID is required" });
    }
    const papers = await PaperData.find({ user_id: uid ,deleted:false});
    res.json(papers);
    // console.log(papers)
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
});

router.get("/all_paper", async (req, res) => {
  try {
    const allPaper = await PaperData.find({ approval_status: "Approved" , deleted:false});
    res.json(allPaper);
    // console.log(allPaper)
  } catch (error) {
    res.status(500).json({ error: "error fetching data..." });
  }
});


router.get("/get_paper/:id",async(req,res)=>{
   const{id}=req.params;
  await PaperData.findById(id)
   .then((paper)=>res.status(200).json(paper))
   .catch((error)=>res.status(500).json({message:"Error while updating the paper",error}))
})

router.put("/edit_paper/:id", async (req, res) => {
    const { id } = req.params;
    const { title, department, subject, year, semester, paper_type, exam_type } = req.body;
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
                deleted:false
            },
            { new: true } 
        );

        if (!updatedPaper) {
            return res.status(404).json({ message: "Paper not found" });
        }

        res.status(200).json({ message: "Paper updated successfully", updatedPaper });
    } catch (error) {
        res.status(500).json({ message: "Error while updating the paper", error });
    }
});

 

router.put("/:id/delete",async(req,res)=>{
    const {id}=req.params;
   await PaperData.findByIdAndUpdate(id,{deleted:true},{new:true})
    .then((updatedPapers)=>{
        res.json({message:"user marked as deleted"})
    })
    .catch((error)=>{
        res.status(500).json({message:"Failed to mark as deleted",error})
    })
})



router.get('/:id/view_paper',async(req,res)=>{
  try{
    const {id}=req.params;
    // console.log(id)
     await PaperData.findOne({_id:id})
    .then((papers)=>res.status(200).json(papers))
    .catch((error)=>res.status(404).json({message:"Paper not found",error}))
    
  }catch(error){
    res.status(404).json({message:error})
  }  
})



module.exports = router;
