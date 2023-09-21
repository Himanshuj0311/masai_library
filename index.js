const express = require("express")

const {connection} = require("./db")

const {userRouter} = require("./routes/user.route")

const {bookRouter} = require("./routes/book.routes")

const {orderRouter}= require("./routes/order.routes")

//const {auth} = require("./middleware/auth.middleware")

const app = express()

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("welcome")
})



app.use("/user", userRouter)

app.use("/book", bookRouter)

app.use("/order", orderRouter)

//app.use(auth)s

app.listen(8080,async()=>{
    try{
       await connection
       console.log("db is connected to server")
    }
    catch(err){
       console.log(err.message)
    }
    console.log("server is running at port 8080")
})