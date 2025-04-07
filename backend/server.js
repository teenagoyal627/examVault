const express=require("express")
const connectDB =require('./db')
const cors=require("cors")
const app= express();
app.use(express.json())


app.use(
    cors({
        origin:["http://localhost:3000","https://exam-vault-three.vercel.app"],
        methods:['GET','POST','PUT','DELETE'],
        credentials:true,
        allowedHeaders:['Content-Type',"Authorization"]
    })
)

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

connectDB()


const paperRoutes=require("./routes/paperRoute")
const userRoutes=require("./routes/userRoutes")
const loginRoutes=require("./routes/loginRoute")

app.use("/papers",paperRoutes)
app.use("/users",userRoutes)
app.use("/login",loginRoutes)


const PORT=5001;
app.listen(PORT,()=>{
    console.log(`${PORT}`)
})