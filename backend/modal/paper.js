
const mongoose=require("mongoose");
const subjects=require("./subject")
const file_type=require('./fileType')
const Schema=mongoose.Schema;
// const ObjectId=Schema.Types.ObjectId;

const PaperSchema=new Schema({
    user_id:{type:String},
    uploaded_by:{type:String},
    title:{type:String},
    subject:{type:String,enum:subjects},
    paper_type:{type:String},
    exam_type:{type:String},
    year:{type:String},
    semester:{type:String},
    department:{type:String},
    created_at:{type:Date,default:Date.now},
    paper_approval_status:{type:String},
    approval_at:{type:Date},
    approved_by:{type:String},
    comment:{type:String},
    updated_at:{type:Date},
    deleted:{type:Boolean,default:false},
    file_url:{type:String},
    file_type:{type:String,enum:file_type},
    download_user_ids:{type:[String],default:[]},


})


const PaperData=mongoose.model("papers",PaperSchema)
module.exports=PaperData;