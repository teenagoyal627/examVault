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
     
     if(user){
        const{role,user_approval_status}=user;
        // const role=user.role;
        if(role==='teacher'){
            if(user_approval_status==='Approved'){
                return res.json({role:role,status:'Approved'})
            }else{
                return res.json({role:role,status:'Not Approved'})
            }
            
        // res.json({role:role})
     }else if(role==='student'){
        return res.json({role:role})
    }else{
        res.status(500).json({message:'role not found'})
    }
}else{
        res.status(500).json({message:'user not found'})
     }

    }catch(error){
        res.status(500).json({error:` Error getting role ${error}`})
    }
})



module.exports=router