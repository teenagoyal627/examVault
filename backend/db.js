const mongoose = require("mongoose");
require("dotenv").config()

const connectDB=async()=>{
    try{
        // const MONGO_URI="mongodb+srv://ExamVaultProject:examVaultPassword@examvault.rotik.mongodb.net/ExamVault?retryWrites=true&w=majority&appName=ExamVault"
        // await mongoose.connect(MONGO_URI)
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongodb is connected")
    }catch(error){
        console.log(error)
        process.exit(1);
    }
}

module.exports=connectDB;

