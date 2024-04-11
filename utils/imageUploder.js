const cloudinary = require('cloudinary').v2
exports.imageUploadInCloudinary=async(file,folder)=>{
    // const {option}=folder
    console.log(file,folder)
    try {
        return await cloudinary.uploader.upload(file.tempFilePath,{
            folder:folder,
            resource_type:"image"
        })
    } catch (error) {
        console.log("error in uploading image",error)
    }
}

exports.videoUploadInCloudinary=async(file,folder)=>{
      return await cloudinary.uploader.upload(file.tempFilePath,{
        folder:folder,
        resource_type:"image"
      })
}