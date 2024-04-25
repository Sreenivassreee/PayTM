const express=require('express')
const userRouter=require('./routes/userRoute')
const cors=require('cors')
const app=express()
app.use(express.json())
app.use("/api/v1/user",userRouter)

app.listen('3000',()=>{
    console.log("http://localhost:3000")
})