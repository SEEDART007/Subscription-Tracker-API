require('dotenv').config()
const express = require('express')
const app = express();
const port = process.env.PORT || 4000

const userRouter = require('./routes/user.routes')
const authRouter = require('./routes/auth.routes')
const subscriptonRouter = require('./routes/subscription.routes');
const errorMiddleware = require('./middlewares/error.middleware');
const cookieParser = require('cookie-parser')
const connectDB = require('./database/mongodb')


app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

app.use('/api/v1/auth',authRouter)
app.use('/api/v1/users',userRouter)
app.use('/api/v1/subscription',subscriptonRouter)

app.use(errorMiddleware)

app.get('/',(req,res)=>{
    res.send('<h1>hi i am joesph</h1>')
})
app.listen(port,async()=>{
    await connectDB()
    console.log(`app is listening on port ${port}`)
})