const express = require("express")

const {BookModel} = require("../models/book.model")

const bookRouter = express.Router()

bookRouter.get("/",async(req,res)=>{
    let query = {}
    
    if(req.query.category){
      query = {category : req.query.category}
    }
    else if(req.query.author&&req.query.category){
        query = {author: req.query.author, category : req.query.category}
    }
    
    try{
   const books = await BookModel.find(query)
   res.status(200).send(books)
    }
    catch(err){
    res.status(400).send(err.message)
    }
})

bookRouter.get("/:id",async(req,res)=>{
    const id = req.params.id
    try{
   const books = await BookModel.findOne({_id:id})
   res.status(200).send(books)
    }
    catch(err){
    res.status(400).send(err.message)
    }
})

bookRouter.post("/",async(req,res)=>{
const { title,author,category,price,quantity}=req.body

 try{
  const book = new BookModel({title,author,category,price,quantity})
  await book.save()
  res.status(201).send("Book saved")
 }
 catch(err){
    res.status(400).send(err.message)
 }
})

bookRouter.patch("/:id",async(req,res)=>{
    const id = req.params.id
    const payload = req.body

    try{
      await BookModel.findByIdAndUpdate({_id:id},payload)
      res.status(204).send("book info updated")
    }
    catch(err){
     res.status(400).send(err.message)
    }
})

bookRouter.delete("/:id",async(req,res)=>{
    const id = req.params.id
    //const payload = req.body

    try{
      await BookModel.findByIdAndDelete({_id:id})
      res.status(204).send("book deleted")
    }
    catch(err){
     res.status(400).send(err.message)
    }
})



module.exports = {bookRouter}