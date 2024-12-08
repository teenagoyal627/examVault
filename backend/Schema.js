const mongoose=require("mongoose");

const UserSchema=new mongoose.Schema({
    user_id:{type:String,required:true},
    name:{type:String,required:true},
    email:{type:String, required:true},
    role:{type:String,required:true},
    approval_status:{type:Boolean},
    approved_time:{type:Date,default:null},
    created_at:{type:Date,default:Date.now},
    updated_at:{type:Date,default:Date.now}


})

const UserData=mongoose.model("userdetails",UserSchema)
module.exports={UserData}