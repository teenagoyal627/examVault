const mongoose=require("mongoose");

const UserSchema=new mongoose.Schema({
    user_id:{type:String},
    name:{type:String,required:true},
    email:{type:String, required:true},
    role:{type:String,required:true},
    role_id:{type:String, required:true},
    department:{type:String,required:true},
    semester:{type:String,requird:true},
    university:{type:String,required:true},
    college:{type:String, required:true},
    start_year:{type:Date},
    end_year:{type:Date},
    user_approval_status:{type:Boolean},
    approved_time:{type:Date,default:null},
    created_at:{type:Date,default:Date.now},
    updated_at:{type:Date,default:Date.now},
})



const PaperSchema=new mongoose.Schema({
    user_id:{type:String},
    subject:{type:String},
    title:{type:String},
    year:{type:Number},
    semester:{type:String},
    department:{type:String},
    created_at:{type:Date,default:Date.now},
    approval_status:{type:String,default:false},
    approval_at:{type:Date},
    approved_by:{type:String},
    comment:{type:String},
    updated_at:{type:Date}


})

const UserData=mongoose.model("userdetails",UserSchema)
const PaperData=mongoose.model("papers",PaperSchema)
module.exports={UserData,PaperData}