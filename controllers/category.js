const mongoose=require('mongoose')
const Category=require('../models/Category.model')
const courseModel = require('../models/course.model')
const userModel = require('../models/user.model')
// create Tags
exports.createCategory=async(req,res)=>{
    try {
        //data fetch
        const {name,description}=req.body
        console.log(req.body)
        // validarion
        if(!name||!description){
            return res.status(404).json({
                sucess:false,
                message:'please enter all data'
            })
        }
        // create DB
        const tagCreate=await Category.create({
            name,
            description,
            course:[]
        })
        return res.status(200).json({
            sucess:true,
            message:'Tag created successfully',
            tagCreate
        })

    } catch (error) {
        return res.status(505).json({
            sucess:false,
            message:'error occour in creating Tag'
        })
    }
}

//get All tags

exports.getAllCategory=async(req,res)=>{
    try {
        // fetch all tags
        const allTags=await Category.find({},{name:true,description:true});
        return res.status(200).json({
            sucess:true,
            message:'All tags fetch',
            allTags
        })
    } catch (error) {
        return res.status(404).json({
            sucess:false,
            message:'Error in getting all tags',
            allTags
        })
    }
}

// get all course of perticular category
exports.categoryPageDetails=async()=>{
    try {
        // fetch the data
        const {categoryId}=req.body
        // getCourse with Id
        const sameIdCourse=await Category.find({_id:categoryId})
        if(!allCourse){
            return res.status(404).json({
                sucess:false,
                message:"course not find"
            })
        }
        const differentCourse=await Category.find({
                                                  _id:{$ne:categoryId}
                                                 })
                                                 .populate("course")
                                                 .exec()
        return res.status(200).json({
            sucess:true,
            message:"course find sucessfully",
            sameIdCourse,
            differentCourse
        })
    } catch (error) {
        return res.status(404).json({
            sucess:false,
            message:`error in finding catagory details`
        })
    }
}
