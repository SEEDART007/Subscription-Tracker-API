const express = require('express')
const subscriptonRouter = express.Router()
const {createSubscription,getUsersSubscriptions} = require('../controllers/subscription.controller')
const authorize = require('../middlewares/auth.middleware')

subscriptonRouter.get('/',(req,res)=>res.send('get all subscriptions'))

subscriptonRouter.get('/:id',(req,res)=>res.send('get subscription details'))

subscriptonRouter.post('/',authorize,createSubscription)

subscriptonRouter.put('/:id',(req,res)=>res.send('update a subscription'))

subscriptonRouter.delete('/:id',(req,res)=>res.send('delete a subscription'))

subscriptonRouter.get('/user/:id',authorize,getUsersSubscriptions)

subscriptonRouter.put('/:id/cancel',(req,res)=>res.send('cancel subscriptions'))

subscriptonRouter.get('/upcoming-renewals',(req,res)=>res.send('get upcoming subscriptions'))

module.exports = subscriptonRouter;