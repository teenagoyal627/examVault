const mongoose=require('mongoose')
const subjects=require("./subject")

const NotesSchema=new mongoose.Schema({
    user_id:{type:String},
    uploaded_by:{type:String},
    title:{type:String},
    subject:{type:String,enum:subjects},
    year:{type:String},
    semester:{type:String},
    department:{type:String},
    unit_no:{type:String},
    created_at:{type:Date,default:Date.now},
    file_url:{type:String},
})

const NotesData=mongoose.model("notes",NotesSchema)
module.exports=NotesData
