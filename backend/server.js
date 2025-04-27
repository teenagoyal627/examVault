const express=require("express")
const connectDB =require('./db')
const cors=require("cors")
const app= express();
app.use(express.json())


app.use(
    cors({
        origin:["http://localhost:3000","http://localhost:3001","https://exam-vault-three.vercel.app"],
        methods:['GET','POST','PUT','DELETE'],
        credentials:true,
        allowedHeaders:['Content-Type',"Authorization"]
    })
)

connectDB()


const paperRoutes=require("./routes/paperRoute")
const notesRoutes=require("./routes/notesRoute")
const userRoutes=require("./routes/userRoutes")
const loginRoutes=require("./routes/loginRoute")

app.use("/papers",paperRoutes)
app.use("/notes",notesRoutes)
app.use("/users",userRoutes)
app.use("/login",loginRoutes)


const PORT=5001;
app.listen(PORT,()=>{
    console.log(`${PORT}`)
})