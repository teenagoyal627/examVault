const mongoose=require("mongoose");

const UserSchema=new mongoose.Schema({
    user_id:{type:String},
    name:{type:String},
    email:{type:String},
    role:{type:String},
    teacher_id:{type:String },
    student_id:{type:String},
    department:{type:String},
    semester:{type:String},
    university:{type:String,},
    college:{type:String },
    start_year:{type:Date},
    end_year:{type:Date},
    user_approval_status:{type:Boolean},
    approved_time:{type:Date,default:null},
    created_at:{type:Date,default:Date.now},
    updated_at:{type:Date,default:Date.now},
})



const UserData=mongoose.model("userdetails",UserSchema)
module.exports =UserData