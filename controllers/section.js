const mongoose=require('mongoose')
const Section=require('../models/section.model')
const SubSection=require('../models/subsection.model')
const Course=require('../models/course.model')

// create section

exports.createSection=async(req,res)=>{
    try {
        // data fetch
        const {name,courseId}=req.body
        // data validation
        if(!name){
         return res.status(404).json(
            {sucess:false,
            message:'please enter all data'})
        }
        // create section
        const sectionCreate=await Section.create({
            name
        })
        // update to course 
        // how couserId will come here
       const updatedCourse = await Course.findByIdAndUpdate(courseId,{
           $push:{
              courseContent:sectionCreate._id
           }
        },{new:true})

        return res.status(200).json({
            sucess:true,
            message:'section created successfully',
            updatedCourse:updatedCourse
        })
    } catch (error) {
        return res.status(404).json({sucess:false,
            message:`error in creating section ${error}`
        })
    }
}

// update section

exports.updateSection=async()=>{
   try {
     // data fetch
     const {name,sectionId}=req.body
     // data validation
     if(!name||!sectionId){
      return res.status(404).json(
         {sucess:false,
            message:"please enter all data"
         })
     }
     // update data

     const updateSection=await Section.findByIdAndUpdate(sectionId,{
        name:name
     })
     return res.status(200).json({
        sucess:true,
        message:"section updated successfully",
        updateSection:updateSection
     })
   } catch (error) {
       return res.status(404).json({
           sucess:false,
           message:"error in updating section"
       })
   }
}

// delete section
exports.deleteSection=async(req,res)=>{
    try {
        const {courseId,sectionId}=req.body
        // delete data
        const deletedSection=await Section.deleteOne({_id:sectionId})
          // return response
          //delete this section from courseId
          const  updatedCourse = await Course.updateOne({_id:courseId},{
              $pull:{
                courseContent:sectionId
              }
          })
        return res.status(200).json({
            sucess:true,
            message:"section deleted successfully",
            deletedSection:deletedSection
        })
    } catch (error) {
        return res.status(404).json({
            sucess:false,
            message:`error in deleting section ${error}`
        })
    }
}