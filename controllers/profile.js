const mongoose=require('mongoose')
const profilemodel=require('../models/profile.model')
const userModel=require('../models/user.model')
const courseModel=require('../models/course.model')
const {imageUploadInCloudinary}=require('../utils/imageUploder')

// update profile
exports.updateProfile=async(req,res)=>{
    try {
        // fetch data
        const {fullname,email,gender,dateOfBirth,about,contactNumber}=req.body
         const {profilePic}=req.files.ImageFile
        console.log(profilePic)
        // validation
        if(!fullname||!email||!gender||!dateOfBirth||!about||!contactNumber){
            return res.status(403).json({
                sucess:false,
                message:"All fields are required"
            })
        }
        // fetch which data need to update
        const user=req.user
        const id=user._id
        console.log(id)
        // const image=imageUploadInCloudinary(profilePic,process.env.IMAGE_FOLDER)
        const profileCreate=await profilemodel.create({
            fullname,email,gender,dateOfBirth,about,contactNumber
            // profilePic:image.secure_url
        })
        console.log(profileCreate)
        await userModel.updateOne({_id:id},{
            $set:{
                additionalDetails:profileCreate._id
            }
        })
        return res.status(200).json({
            sucess:true,
            message:"profile updated",
            profileCreate
        })
    } catch (error) {
        return res.status(404).json({
            sucess:false,
            message:`error is ${error}`
        })
    }
}
//Delete profile

exports.deleteProfile=async(req,res)=>{
    try {
        // fetch data
    const id=req.user._id
    // validate
    const findUser=await userModel.findById(id)
    if(!findUser){
        return res.status(404).json({
            sucess:false,
            message:"user not find"
        })
    }
    // delete from profile model
    await profilemodel.deleteOne({_id:findUser.additionalDetails})

    // delete from enrole course
    const enroledCourse=findUser.courses
    enroledCourse.forEach(async(course) => {
        await courseModel.updateOne({_id:course},{
            $pull:{
                studentEnrolled:findUser._id
            }
        })
    });

        //delete fronm userModel
        await userModel.deleteOne({_id:id})
        
    return res.status(200).json({
        sucess:true,
        message:"user deleted sucessfully"
    })
    } catch (error) {
        return res.status(404).json({
            sucess:false,
            message:`error is ${error}`
        })
    }
}

// getUser details
exports.getUserDetails=async(req,res)=>{
    try {
        const user=req.user
        const id=user._id
        console.log(id)
        const findUser=await userModel.findOne({_id:id})
                                            .populate("additionalDetails")
        console.log(findUser)
        return res.status(200).json({
            sucess:true,
            message:"user details",
            findUser
        })
    }catch(error){
        return res.status(200).json({
            sucess:true,
            message:`error ${error}`,
            // findUser
        })
    }
}