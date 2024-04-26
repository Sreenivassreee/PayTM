const express=require('express')
const userRouter=require('./routes/userRoute')
const accountRouter=require('./routes/accountRoute')
const cors=require('cors')
const app=express()
app.use(express.json())
app.use("/api/v1/user",userRouter)
app.use("/api/v1/account",accountRouter)

app.listen('3000',()=>{
    console.log("http://localhost:3000")
})