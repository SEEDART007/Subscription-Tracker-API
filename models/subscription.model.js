const mongoose = require('mongoose')
const subscriptionSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'must need a subscription name'],
        trim:true,
        minLength:2,
        maxLength:100
    },
    price:{
        type:Number,
        required:[true,'subscription price is required'],
        minLength:[0,'price must be greater than 0']
    },
    currency:{
        type:String,
        enum:['USD','EUR','GBP'],
        default:'USD'
    },
    frequency:{
        type:String,
        enum:['daily','weekly','monthly','yearly']
    },
    category:{
        type:String,
        enum:['sports','news','entertainment','lifestyle','technology','finance','politics','other'],
        required:true
    },
    paymentMethod:{
        type:String,
        required:true,
        trim:true
    },
    status:{
        type:String,
        enum:['active','cancelled','expired'],
        default:'active'
    },
    startDate:{
        type:Date,
        required:true,
        validate:{
            validator:(value)=>value<=new Date(),
            message:'start date must be in the past'
        }
    },
    renewalDate:{
        type:Date,
        validate:{
            validator:function (value){
               return value > this.startDate
            },
            message:'start date must be in the past'     
        }
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
        index:true
    }
},{timestamps:true})

subscriptionSchema.pre('save',function(next){
    if(!this.renewalDate){
        const renewalPeriods={
            daily:1,
            weekly:7,
            monthly:30,
            yearly:370
        }
        this.renewalDate = new Date(this.startDate)
        this.renewalDate.setDate(this.renewalDate.getDate()+ renewalPeriods[this.frequency])
    }
    if(this.renewalDate< new Date()){
         this.status='expired'
    }
    next()
})

const Subscription = mongoose.model('Subscription',subscriptionSchema)

module.exports=Subscription;