const mongoose = require("mongoose");
const connectDB=async()=>{
    try{
        const MONGO_URI="mongodb+srv://ExamVaultProject:examVaultPassword@examvault.rotik.mongodb.net/ExamVault?retryWrites=true&w=majority&appName=ExamVault"
        await mongoose.connect(MONGO_URI)
        console.log("mongodb is connected")
    }catch(error){
        console.log(error)
    }
}

module.exports=connectDB;

