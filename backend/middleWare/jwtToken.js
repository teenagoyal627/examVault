
const adminAuth=require('../firebaseAdmin')

const verifyToken=async(req,res,next)=>{
    const idToken=req.headers.authorization.split(" ")[1]
    if (!idToken) {
        return res.status(401).json({ error: "Unauthorized: Token not provided" });
      }
      try{
        const decodedToken=await adminAuth.verifyIdToken(idToken)
        req.uid=decodedToken.uid
        next()
      }catch(error){
        res.status(403).json({message:"JWT token error", error })
      }
}

module.exports=verifyToken 