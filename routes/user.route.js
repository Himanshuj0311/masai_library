const express = require("express")
const { UserModel } = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userRouter = express.Router()

userRouter.get("/",async(req,res)=>{
    try{
    const users = await UserModel.find()
    res.send(users)
    }
    catch(err){
        res.send(err.message)
    }
})

userRouter.post("/register",async(req,res)=>{
    const {name, email, password, isAdmin}= req.body
   bcrypt.hash(password,8,async(err,hash)=>{
     if(err){
         res.status(400).send(err.message)
     }
     else{
        try{
            const user = new UserModel({name, email,password:hash,isAdmin})
            await user.save()
            res.status(201).send("User created")
        }
        catch(err){
            res.status(400).send(err)
        }
     }
   })
    
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body

    const user = await UserModel.findOne({email:email})

   // console.log(user)

    bcrypt.compare(password, user.password,(err,result)=>{
       if(err){
        res.status(400).send(err.message)
       }
       else{
        const token = jwt.sign({userId:user._id,isAdmin:user.isAdmin},"token")
        res.status(201).send({
            token: token,
            msg:"logged in"
        })
       }
    })
})

module.exports = {userRouter}