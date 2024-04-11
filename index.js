const express=require('express')
const bodyParser=require('body-parser')
const connectCloudinary=require('./config/cloudinary')
const connectDB=require('./config/database')
const router=require('./routers/router')
const cookieParser=require('cookie-parser')
const fileUpload=require('express-fileupload')
const cors=require('cors')
require('dotenv').config()
// routers
const courseRoute=require('./routers/courseRoute')
const profileRoute=require('./routers/profileRoute')
const userRoute=require('./routers/userRoute')
const app=express()
// middle ware
app.use(express.json())
app.use(bodyParser.urlencoded())
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:'/tmp/',
    createParentPath:true
}));
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true,
    optionsSuccessStatus:200
}))

// routers
app.use('/api/v1/auth/',userRoute)
app.use('/api/v1/profile/',profileRoute)
app.use('/api/v1/course/',courseRoute)

//default route
app.get('/',(req,res)=>{
    return res.send("hello world")
})

// start server
app.listen(process.env.PORT,()=>{
    console.log(`server is running on ${process.env.PORT}`)
})

//connect database and cloudinary
connectCloudinary()
connectDB()


