const moongose=require('mongoose')
const subjects=require("./subject")

const NotesSchema=new moongose.Schema({
    user_id:{type:String},
    uploaded_by:{type:String},
    subject:{type:String,enum:subjects},
    year:{type:String},
    semester:{type:String},
    department:{type:String},
    unit_no:{type:String},
    created_at:{type:Date,default:Date.now},
})

const NotesData=moongose.modelNames("notes",NotesSchema)
module.exports=NotesData
