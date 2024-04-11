const mongoose=require('mongoose')
const JWT=require('jsonwebtoken')
require('dotenv').config()
const userModel=require('../models/user.model')
// Auth
exports.Auth=async (req,res,next)=>{
    try {
        // extract token
        const token=req.cookies.token
        console.log(token)
        // if token missing
        if(!token){
            return res.status(404).json({
               sucess:false,
               message:"Token missing"
            })
        }
 
        try {
            const decode= JWT.verify(token,process.env.JWT_SECRET)
            console.log(decode)
            req.user=decode

        } catch (error) {
            return res.status(404).json({
                sucess:false,
                message:'Token is invalid'
            })
        }
        next();
    } catch (error) {
        return res.status(200).json({
           sucess:false,
           message:"some thing went wrong in token varification"
        })
    }
}

//isstudent
exports.isStudent=(req,res,next)=>{
    // user fetch from request body
    try {
        const user=req.user
        if(!user.accountType==="student"){
           return res.status(404).json({
               sucess:false,
               message:"This is protected route for student only"
           })
        }
        next();
    } catch (error) {
        return res.status(404).json({
            sucess:false,
            message:"student role donot varified"
        })
    }
}

//isInstructor
exports.isInstructor=(req,res,next)=>{
      // user fetch from request body
    try {
        const user=req.user
        if(!user.accountType==="Instructor"){
           return res.status(404).json({
               sucess:false,
               message:"This is protected route for Instructor only"
           })
        }
        next();
    } catch (error) {
        return res.status(404).json({
            sucess:false,
            message:"Instructor role donot varified"
        })
    }
}

//isAdmin

exports.isAdmin=(req,res,next)=>{
    // user fetch from request body
  try {
      const user=req.user
      if(!user.accountType==="Admin"){
         return res.status(404).json({
             sucess:false,
             message:"This is protected route for Admin only"
         })
      }
      next();
  } catch (error) {
      return res.status(404).json({
          sucess:false,
          message:"IAdmin role donot varified"
      })
      
  }
}