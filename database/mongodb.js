require('dotenv').config()
const mongoose = require('mongoose')

const connectToDatabase = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URI)
        console.log("successfully connected to db")
    } catch (error) {
        console.log("Error connecting to database",error)
        process.exit(1)
    }
}
module.exports = connectToDatabase;