const express=require("express")
const {UserData} =require("../modal/modal")
const router=express.Router();
const verifyToken=require("../middleWare/jwtToken")


router.get('/get_role',verifyToken,async(req,res)=>{
    try{
        // const userId=req.params.uid;
        const{uid}=req;
        console.log(uid)
        if(!uid){
            res.status(403).json({error:`uid is not present ${error}`})
        }
     const user= await UserData.findOne({user_id:uid})
     
     if(user){
        res.json({role:user.role})
     }else{
        res.status(500).json({message:'user not found'})
     }

    }catch(error){
        res.status(500).json({error:` Error getting role ${error}`})
    }
})



module.exports=router