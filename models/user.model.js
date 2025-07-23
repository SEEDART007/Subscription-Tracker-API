const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'a name is must required'],
        trim:true,
        minLength : 2,
        maxLength:50
    },
     email:{
        type:String,
        required:[true,'a email is must required'],
        trim:true,
        lowercase:true,
        unique:true,
        match:[/\S+@\S+\.\S+/,'Please give a valid email address']
    },
    password:{
        type:String,
        required:[true,'password is must required'],
        minLength:7
    }
},{timestamps:true})

const User = mongoose.model('User',userSchema)
module.exports=User;