const express = require("express")

const orderRouter = express.Router()

const {auth}= require("../middleware/auth.middleware")

const {OrderModel}= require("../models/order.model")

const jwt = require("jsonwebtoken")
const { BookModel } = require("../models/book.model")
const { authorization } = require("../middleware/authorization.middleware")

orderRouter.post("/",auth,async(req,res)=>{
    
    const books = req.body
    const token = req.headers.authorization
    const decoded = jwt.verify(token,"token")
    let amount = 0
    for(let i=0;i<books.length;i++){

        const book = await BookModel.findOne({_id:books[i]})
        amount += book.price
    }
    
    try{
       const order = new OrderModel({user:decoded.userId, books: books,totalAmount:amount})
       await order.save()
       res.status(201).send("order placed")
    }
    catch(err){
      res.status(400).send(err.message)
    }
})

orderRouter.get("/",auth,authorization,async(req,res)=>{
    try{
    const orders = await OrderModel.find().populate("users").populate("books")
    res.status(200).send(orders)
    }
    catch(err){
    res.status(400).send(err.message)
    }
})

module.exports = {orderRouter}