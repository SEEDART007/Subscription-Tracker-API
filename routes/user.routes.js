const express = require('express')
const userRouter = express.Router()
 
userRouter.get('/',(req,res)=>res.send('GET all users'))
userRouter.get('/:id',(req,res)=>res.send('GET single user'))
userRouter.post('/',(req,res)=>res.send('CREATE a user'))
userRouter.put('/:id',(req,res)=>res.send('update a user'))
userRouter.delete('/:id',(req,res)=>res.send('delete a user'))


module.exports=userRouter