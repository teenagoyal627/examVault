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


const paperRoutes=require("./routes/paperRoute")
const userRoutes=require("./routes/userRoutes")
const loginRoutes=require("./routes/authRoute")

app.use("/papers",paperRoutes)
app.use("/users",userRoutes)
app.use("/login",loginRoutes)




const PORT=5000;
app.listen(PORT,()=>{
    console.log(`${PORT}`)
})