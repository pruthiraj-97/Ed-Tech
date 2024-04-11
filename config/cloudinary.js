const cloudinary=require('cloudinary').v2
const connectCloudinary=async()=>{
   try {
    await cloudinary.config({
        cloud_name:process.env.CLOUD_NAME,
        api_key:process.env.API_KEY,
        api_secret:process.env.API_SECRET
    })
    console.log("cloudinary connected sucessfully ")
   } catch (error) {
    console.log("error in cloudinary connection")
   }
}

module.exports=connectCloudinary