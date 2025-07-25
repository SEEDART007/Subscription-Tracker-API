const User = require('../models/user.model')
exports.getUsers = async(req,res,next)=>{
    try {
        const users = await User.find()
        res.status(200).json({
            status:true,
            results:users.length,
            data:users
        })
    } catch (error) {
        next(error)
    }
}

exports.getUser = async(req,res,next)=>{
    try {
       
        const user = await User.findById(req.params.id).select('-password')
        if(!user){
            const error = new Error('User not exist')
            error.statusCode = 404
            throw error
        }
        res.status(200).json({
            status:true,
            data:user
        })
    } catch (error) {
        next(error)
    }
}