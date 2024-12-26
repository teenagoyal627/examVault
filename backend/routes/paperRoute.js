const express = require("express");
const { PaperData, UserData } = require("../modal/modal");
const router = express.Router();
const verifyToken = require("../middleWare/jwtToken");

router.post("/upload_paper", verifyToken, async (req, res) => {
  try {
    const { uid } = req;
    const user = await UserData.findOne({ user_id: uid });
    const role = user.role;
    const name = user.name;

    let approval_status = "Pending";
    let approval_at = null;
    let approved_by = null;
    let comment = "no comment";
    let updated_at = null;

    if (role === "teacher") {
      approval_status = "Approved";
      approval_at = Date.now();
      approved_by = name;
    }

    const { department, subject, year, semester, paper_type, exam_type, file_url } =
      req.body;

    const newPaper = new PaperData({
      user_id: uid,
      subject,
      paper_type,
      exam_type,
      year,
      semester,
      department,
      approval_status,
      approval_at,
      approved_by,
      comment,
      updated_at,
      deleted:false,
      file_url,
    });

    await newPaper.save();
    res
      .status(200)
      .json({ success: true, message: "Paper successfully uploaded..." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server error", error });
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
    console.log(papers)
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
});

router.get("/all_paper", async (req, res) => {
  try {
    const allPaper = await PaperData.find({ approval_status: "Approved" , deleted:false});
    res.json(allPaper);
    console.log(allPaper)
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
    PaperData.findByIdAndUpdate(id,{deleted:true},{new:true})
    .then((updatedPapers)=>{
        res.json({message:"user marked as deleted"})
    })
    .catch((error)=>{
        res.status(500).json({message:"Failed to mark as deleted",error})
    })
})

module.exports = router;
