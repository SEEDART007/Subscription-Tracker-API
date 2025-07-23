const express = require('express')
const authRouter = express.Router()

authRouter.post('/sign-up',(req,res)=>{
    res.send("hello signup")
})

authRouter.post('/sign-in',(req,res)=>{
    res.send("hello signin")
})

authRouter.post('/sign-out',(req,res)=>{
    res.send("hello signout")
})


module.exports=authRouter