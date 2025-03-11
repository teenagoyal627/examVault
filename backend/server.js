const express=require("express")
const connectDB =require('./db')
const cors=require("cors")
const app= express();
app.use(express.json())


app.use(
    cors({
        origin:["http://localhost:3000","https://exam-vault-three.vercel.app/"],
        // origin:["https://examvault-smoky.vercel.app"],
        methods:['GET','POST','PUT','DELETE'],
        credentials:true,
        allowedHeaders:['Content-Type',"Authorization"]
    })
)

connectDB()


const paperRoutes=require("./routes/paperRoute")
const userRoutes=require("./routes/userRoutes")
const loginRoutes=require("./routes/loginRoute")

app.use("/papers",paperRoutes)
app.use("/users",userRoutes)
app.use("/login",loginRoutes)

//here i change the port number for ccheck that it is wrok or nt
// here i do this for add server.js file in the github
// beacuse i am trying to deploy this on the rbder



const PORT=5001;
app.listen(PORT,()=>{
    console.log(`${PORT}`)
})