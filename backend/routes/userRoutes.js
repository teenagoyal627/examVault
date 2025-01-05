const express=require("express")
const {PaperData,UserData} =require("../modal/modal")
const router=express.Router();
const verifyToken=require("../middleWare/jwtToken")


router.post("/studentReg",verifyToken,async(req,res)=>{
    try{
        const {uid}=req
        const{name,email,role_id,department,university,college,start_year,end_year}=req.body;
        const newUser=new UserData({
            user_id:uid,
            name,
            email,
            role:"student",
            student_id:role_id,
            department,
            university,
            college,
            start_year,
            end_year,
            user_approval_status:true
        })
        await newUser.save()
        res.status(200).json({
            success:true,
            message:"user registration successfully"
        })

    }catch(error){
        res.status(500).json({error:"server error",error})

    }
})

router.post("/teacherReg",verifyToken,async(req,res)=>{
    try{
        const {uid}=req;
        const{name,email,role_id,department,semester,university,college}=req.body;
        const newUser=new UserData({
            user_id:uid,
            name,
            email,
            role:"teacher",
            teacher_id :role_id,
            department,
            semester,
            university,
            college,
            user_approval_status:false
        })
        await newUser.save()
        res.status(200).json({
            success:true,
            message:"user registration successfully"
        })

    }catch(error){
        res.status(500).json({error:"server error",error})

    }
})


module.exports=router