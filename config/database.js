const mongoose=require('mongoose')
const connectDB=async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Database connect sucsessfully ...")
    } catch (error) {
        console.log("error in database connection ",error)
    }
}

module.exports=connectDB