const express=require("express")
const adminAuth=require('./firebaseAdmin')
const connectDB =require('./db')
const {UserData,PaperData}=require('./modal/modal')
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


// middleware
const verifyToken=async(req,res,next)=>{
    const idToken=req.headers.authorization.split(" ")[1]
    if (!idToken) {
        return res.status(401).json({ error: "Unauthorized: Token not provided" });
      }
      try{
        // console.log(idToken)
        const decodedToken=await adminAuth.verifyIdToken(idToken)
        // console.log(decodedToken)
        req.uid=decodedToken.uid
        next()
      }catch(error){
        res.status(403).json({ error })
      }
}

app.post("/studentReg",verifyToken,async(req,res)=>{
    try{
        const {uid}=req
        const{name,email,role_id,department,university,college,start_year,end_year}=req.body;
        const newUser=new UserData({
            user_id:uid,
            name,
            email,
            role:"student",
            role_id,
            department,
            university,
            college,
            start_year,
            end_year,
            approval_status:true
        })
        await newUser.save()
        res.status(200).json({
            success:true,
            message:"user registration successfully"
        })

    }catch(error){
        res.status(500).json({error:"server error",error})

    }
})

app.post("/teacherReg",verifyToken,async(req,res)=>{
    try{
        const {uid}=req;
        const{name,email,role_id,department,semester,university,college}=req.body;
        const newUser=new UserData({
            user_id:uid,
            name,
            email,
            role:"teacher",
            role_id,
            department,
            semester,
            university,
            college,
            approval_status:false
        })
        await newUser.save()
        res.status(200).json({
            success:true,
            message:"user registration successfully"
        })

    }catch(error){
        res.status(500).json({error:"server error",error})

    }
})

app.get('/get_role',verifyToken,async(req,res)=>{
    try{
        // const userId=req.params.uid;
        const{uid}=req;
        if(!uid){
            res.status(403).json({error:`uid is not present ${error}`})
        }
     const user= await UserData.findOne({user_id:uid})
     
     if(user){
        res.json({role:user.role})
     }else{
        res.status(500).json({message:'user not found'})
     }

    }catch(error){
        res.status(500).json({error:` Error getting role ${error}`})
    }
})



app.post('/upload_paper',verifyToken,async(req,res)=>{
try{
  const {uid}=req;
 const{department,subject,year,semester,paper_type,exam_type}=req.body;

  const newPaper=new PaperData({
    user_id:uid,
    subject,
    paper_type,
    exam_type,
    year,
    semester,
    department,
    approval_status,
    approval_at,
    approved_by,
    comment,
    updated_at
  })
  await newPaper.save()
  res.status(200).json({success:true,message:"Paper successfully uploaded..."})
}catch(error){
    console.log(error)
    res.status(500).json({error:"server error",error})
} 
})

app.get('/my_paper',async(req,res)=>{
    try{
        const{uid}=req.query;
        if(!uid){
            console.log(uid)
            return res.status(400).json({error:"User ID is required"})
        }
        const papers=await PaperData.find({user_id:uid})
        console.log("paper",papers)
        res.json(papers)
    }catch(error){
        res.status(500).json({error:"internal server error"})
    }
})


app.get('/all_paper',async(req,res)=>{
    try{
        const allPaper=await PaperData.find()
        res.json(allPaper)
    }catch(error){
        res.status(500).json({error:"error fetching data..."})
    }
})

const PORT=5000;
app.listen(PORT,()=>{
    console.log(`${PORT}`)
})