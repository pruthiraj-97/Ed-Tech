const mongoose=require('mongoose')
const Category=require('../models/Category.model')
const course=require('../models/course.model')
const userModel=require('../models/user.model')
const {imageUploadInCloudinary}=require('../utils/imageUploder')
// create course
exports.createCourse=async(req,res)=>{
//    try {
//     const {
//         courseName,
//         courseDescription,
//         WhatYouWillLearn,
//         price,
//         category // id of category
//     }=req.body
//     console.log(courseName)
    const thumbnail=req.files.imageFile
    console.log(thumbnail)
//     if(!courseName||!courseDescription||!WhatYouWillLearn||!price||!category||!thumbnail){
//         return res.status(404).json({
//             sucess:false,
//             message:"enter all field"
//         })
//     }
//     // in payload instructor details
//     const user=req.user
//     const _id=user._id
    
//     const instructorDetails=await userModel.findOne({_id})
//     if(!instructorDetails){ 
//         return res.status(404).json({
//             sucess:false,
//             message:"Instructor not found"
//         })
//     }

//     // cheak tag valid
//     const tagDetails=await Category.findById(category);
//     if(!tagDetails){
//         return res.status(404).json({
//             sucess:false,
//             message:"Invalid Category"
//         })
//     }

//     //image upload to cloudinary
//     const imageUpload= await imageUploadInCloudinary(thumbnail,process.env.IMAGE_FOLDER)
//     console.log(imageUpload)
//     //newcourse upload in DB
//     const newCourse=await course.create({
//         courseName,
//         courseDescription,
//         WhatYouWillLearn,
//         instructor:instructorDetails._id,
//         price:parseInt(price),
//         category:tagDetails._id,
//         thumbnail:imageUpload.secure_url
//     })
//     // add this course to instructor course Array

//     await userModel.updateOne({
//         _id:instructorDetails._id,
//     },
//     {
//         $push:{
//             courses:newCourse._id
//         }
//     },{new:true})

//    // update the CategorySchema
//     await Category.updateOne({_id:tagDetails._id},
//     {
//        $push:{
//         course:newCourse._id
//        }
//     })
   
//     return res.status(200).json({
//         sucess:true,
//         message:"new course added sucessfully",
//         newCourse
//     })

//    } catch (error) {
//     console.log("error in adding course")
//      return res.status(404).json({
//         sucess:false,
//         message:`Error in creating course ${error}`
//      })
//     }
}
// getAll courese
exports.getAllcourses=async()=>{
   try {
      const getAllCourse=await course.find({},{
        courseName:true,
        price:true,
        instructor:true,
        thumbnail:true
      })
      .populate("instructor")
   } catch (error) {
     return res.status(404).json({
        sucess:false,
        message:"error in fetching all course"
     })
   }
}
// write a code t
exports.getCourseDetails=async(req,res)=>{
    try {
       // fetch data
       const {courseId}=req.body
       const courseDetails=await course.findOne({_id:courseId})
                                             .populate({
                                                path:"instructor",
                                                populate:{
                                                   path:"additionalDetails"
                                                }
                                             })
                                              .populate({
                                                path:"ratingAndReviews"
                                             })
                                             .populate({
                                                path:"studentEnrolled"
                                             })
                                             .populate({
                                                path:"courseContent",
                                                populate:{
                                                    path:"subSection"
                                                }
                                             })
                                            
        return res.status(200).json({
            sucess:true,
            message:"Course details fetch sucessfully",
            courseDetails
        })
    } catch (error) {
        return res.status(404).json({
            sucess:false,
            message:`error in fetching course details ${error}`
        })
    }
}

//sort course in a perticular category of price
exports.getCourseBydesc=async(req,res)=>{
    try {
        const {courseId}=req.body
        // sort in incressing order of proce
        const allCourse=await Category.findOne({_id:courseId})
                                           .populate("course")
            const sortedCourse=allCourse.course.sort((a,b)=>parseInt(b.price)-parseInt(a.price))
            console.log(sortedCourse)
            return res.status(200).json({
            sucess:true,
            message:"course fetch sucessfully",
            sortedCourse
        })
    } catch (error) {
        return res.status(404).json({
            sucess:false,
            message:`error is ${error}`
        })
    }
}

//sort course in a perticular category of price
exports.getCourseByasc=async(req,res)=>{
    try {
        const {courseId}=req.body
        // sort in decreassing order of proce
        const allCourse=await Category.findOne({_id:courseId})
                                           .populate("course")
            const sortedCourse=allCourse.course.sort((a,b)=>parseInt(a.price)-parseInt(b.price))
            console.log(sortedCourse)
            return res.status(200).json({
            sucess:true,
            message:"course fetch sucessfully",
            sortedCourse
        })
    } catch (error) {
        return res.status(404).json({
            sucess:false,
            message:`error is ${error}`
        })
    }
}
