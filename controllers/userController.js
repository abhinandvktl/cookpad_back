// 6
const users = require('../models/userSchema')

// for login
const jwt = require('jsonwebtoken')

const jwtsecret = process.env.JWTSECRET

// register
exports.registerController = async (req, res) => {

    const { username, email, password } = req.body

    try {
        const userDetails = await users.findOne({ email })
        if (userDetails) {
            res.status(406).json("user already exist please login")
        }
        else {
            const newUser = new users({
                username, email, password
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    }
    catch (err) {
        res.status(401).json(err)
    }
}

// login
exports.loginController = async (req, res) => {

    const { email, password } = req.body

    try {
        const existingUser = await users.findOne({ email, password })
        if (existingUser) {
            const token = jwt.sign({ userId: existingUser._id }, jwtsecret)
            res.status(200).json({ existingUser, token })
            // console.log(existingUser._id);
            // console.log(token);
        }
        else {
            res.status(406).json("incorrect email?password")
        }
    }
    catch (err) {
        res.status(401).json(err)
    }
}

// getwhoPost
exports.getWhoPost=async(req,res)=>{
    const findUser=req.params.userId
    try{
        const userPost=await users.findById(findUser)
        res.status(200).json(userPost)
    }
    catch(err){
        res.status(401).json(err)
    }
}

// edit user
exports.editUser=async(req,res)=>{
    const userId =req.payload
    const{username,email,password}=req.body

    try{
        const updatedUser= await users.findByIdAndUpdate({_id:userId},{username,email,password},{new:true})
        await updatedUser.save()
        res.status(200).json(updatedUser)
    }catch(err){
        res.status(401).json(err)
    }
}