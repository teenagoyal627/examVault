const express=require("express")
const connectDB =require('./db')
const {UserData}=require('./Schema')

const cors=require("cors")
const app= express();
app.use(express.json())

app.use(
    cors({
        origin:["http://localhost:3000"],
        methods:['GET','POST','PUT','DELETE'],
        credentials:true,
        allowedHeaders:['Content-Type',"Authorization"]
    })
)

connectDB()

app.post("/studentReg",async(req,res)=>{
    try{
        const{user_id,name,email}=req.body;
        const newUser=new UserData({
            user_id,
            name,
            email,
            role:"student",
            approval_status:null
        })
        await newUser.save()
        res.status(200).json({
            success:true,
            message:"user registration successfully"
        })

    }catch(error){
        console.log(error)
        res.status(500).json({error:"server error",error})

    }
})


app.post("/teacherReg",async(req,res)=>{
    try{
        const{user_id,name,email}=req.body;
        const newUser=new UserData({
            user_id,
            name,
            email,
            role:"teacher",
            approval_status:false
        })
        await newUser.save()
        res.status(200).json({
            success:true,
            message:"user registration successfully"
        })

    }catch(error){
        console.log(error)
        res.status(500).json({error:"server error",error})

    }
})


const PORT=5000;
app.listen(PORT,()=>{
    console.log(`${PORT}`)
})