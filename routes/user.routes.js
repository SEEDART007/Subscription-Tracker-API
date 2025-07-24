const express = require('express')
const {getUsers,getUser}= require('../controllers/user.controller')
const userRouter = express.Router()
const authorize = require('../middlewares/auth.middleware')
 
userRouter.get('/',getUsers)
userRouter.get('/:id',authorize,getUser)
userRouter.post('/',(req,res)=>res.send('CREATE a user'))
userRouter.put('/:id',(req,res)=>res.send('update a user'))
userRouter.delete('/:id',(req,res)=>res.send('delete a user'))


module.exports=userRouter