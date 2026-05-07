const jwt=require("jsonwebtoken")

const verifyJWT=(req,res,next)=>{
    const authHeader=req.headers.authorization || req.headers.Authorization
    if(!authHeader?.startsWith("Bearer "))
        return res.status(400).send("unauthorized")
    const token= authHeader.split(' ')[1]
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err,decoded)=>{
            if(err)
                return res.send("error")
            req.user=decoded
            next()
        }
    )
}

module.exports=verifyJWT