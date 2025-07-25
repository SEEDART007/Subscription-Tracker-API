const Subscription = require("../models/subscription.model")

exports.createSubscription = async(req , res , next)=>{
    try {
        const subscription = await Subscription.create({
            ...req.body,
            user:req.user._id
        })
        res.status(201).json({
            status:true,
            data:subscription
        })
    } catch (error) {
        next(error)
    }
}
exports.getUsersSubscriptions = async(req , res , next)=>{
    try {
        const allSubs = await Subscription.find()
        res.status(200).json({
            status:true,
            data:allSubs 
        })
    } catch (error) {
        next(error)
    }
}