const express=require("express")
const {UserData} =require("../modal/modal")
const router=express.Router();
const verifyToken=require("../middleWare/jwtToken")


router.get('/get_role',verifyToken,async(req,res)=>{
    try{
        const{uid}=req;
        console.log(uid)

        if(!uid){
            res.status(403).json({error:`uid is not present ${error}`})
        }

     const user= await UserData.findOne({user_id:uid})
     

     if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

        const{role,user_approval_status,name}=user;


        res.setHeader("Access-Control-Allow-Origin", "*");  // ✅ Ensure CORS is set
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

        if(role==='teacher'){
            if(user_approval_status==='Approved'){
                return res.json({role:role,status:'Approved',name:name})
            }else{
                return res.json({role:role,status:'Not Approved'})
            }
        // res.json({role:role})
     }else if(role==='student'){
        return res.json({role:role,name:name})
    }else{
        res.status(500).json({message:'role not found'})
    }

    }catch(error){
        res.status(500).json({error:` Error getting role ${error}`})
    }
})


router.get('/get_teacher_data',verifyToken,async(req,res)=>{
    try{
        const{uid}=req;
        console.log(uid)
        if(!uid){
            res.status(403).json({error:`uid is not present ${error}`})
        }
     const user= await UserData.findOne({user_id:uid})
     res.setHeader("Access-Control-Allow-Origin", "*");  // ✅ Ensure CORS is set
     res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
     res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

     res.status(200).json(user)
    }catch(error){
        res.status(500).json({error:` Error getting role ${error}`})
    }

})

module.exports=router