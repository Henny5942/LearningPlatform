const User = require('../models/User');
const bcrypt= require("bcrypt")
const jwt=require("jsonwebtoken")

const login= async(req,res)=>{
    const {username,password}=req.body
    if(!username || !password)
        res.status(400).send("username and password are required")
    const user= await User.findOne({username})
    if(!user)
        return res.send("The username is not exist")
    const match= await bcrypt.compare(password,user.password)
    if(!match) 
        return res.send("The password is incorrect")
    const userInfo= {_id:user._id, username: user.username, phone: user.phone}

    const accessToken= jwt.sign(userInfo,process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken})

}


const register= async(req,res)=>{
    const {username, password,  phone}=req.body
    if(!username || !password )
        return res.status(400).send("username and password are required")
    const exist= await User.findOne({username}).lean()
    if(exist)
        return res.status(409).send("the username is exist")
    const hashPassword=await bcrypt.hash(password,10)
    const user=await User.create({username, password:hashPassword, phone})
    if(!user)
        return res.status(400).send("error")
    return res.json(user)
}

const getAllUsers= async(req,res)=>{
    try {
        const users= await User.find()
        res.json(users)
    } catch (error) {
        res.status(500).send("Error fetching users")
    }
}



module.exports= {login,register,getAllUsers}