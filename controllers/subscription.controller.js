const Subscription = require("../models/subscription.model")
const {workflowClient} = require('../config/upstash')

exports.createSubscription = async(req , res , next)=>{
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user:req.user._id
        })
      
     const { workflowRunId } = await workflowClient.trigger({
      url: `http://localhost:3000/api/v1/workflows/subscription/reminder`,
      body: {
        subscriptionId: subscription.id,
      },
      headers: {
        'content-type': 'application/json',
      },
      retries: 0,
    })
      res.status(201).json({
            status:true,
            data:{subscription,workflowRunId}
        })
    } catch (error) {
        next(error)
    }
}
exports.getUsersSubscriptions = async(req , res , next)=>{
    try {
     if(req.user.id!==req.params.id){
        const error = new Error('you are not the owner of this account')
        error.statusCode = 401
        throw error
     }
     const subscriptions = await Subscription.find({user:req.params.id})
     res.status(200).json({
        status:true,
        data:subscriptions
     })
    } catch (error) {
        next(error)
    }
}