const express = require("express")
const jwt = require("jsonwebtoken")

const auth = (req,res,next)=>{

    const token = req.headers.authorization

if(!token){
    res.send("Unauthorized")
}
else{
    const decoded = jwt.verify(token,"token")
    if(decoded){
        next()
    }
    else{
        res.send("please try again")
    }
}
}

module.exports = {auth}