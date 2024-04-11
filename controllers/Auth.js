const mongoose=require('mongoose')
const userModel=require('../models/user.model')
const otpModel=require('../models/OTP.model') 
const optGenerater=require('otp-generator')
const bcrypt=require('bcryptjs')
const JWT=require('jsonwebtoken')
const profile=require('../models/profile.model')
const nodemailer=require('nodemailer')
const {sendEmail}=require('../utils/emailSend')
// sign up 
exports.signUp=async (req,res)=>{
    // data fetch from request body
    try{
    const {firstName,
           lastName,
           email,
           password,
           confirmpassword,
           contact,
           accountType,
           otp
       }=req.body
    // validdate 
    if(!firstName||!lastName||!email||!password||!confirmpassword||!contact||!contact||!accountType||!otp){
        return res.status(403).json({
           sucess:"false",
           message:"All field are required"
        })
    }
      // cheak two password equal
    if(password!==confirmpassword){
        return res.status(403).json({
            sucess:"false",
            message:"password and confirmpassword value doesnot match"
         })
    }
    // useralready exist
    console.log(req.body)
    const userExist=await userModel.find({email:email})

    if(userExist.length!=0){
        return res.status(400).json({
            sucess:"false",
            message:"user aleady exist"
         })
    }
  
    // find resend otp 
    const resendOtp=await otpModel.find({email}).sort({createdAt:-1}).limit(1)
    if(resendOtp.length==0){
        return res.status(403).json({
            sucess:false,
            message:"OTP not find"
        })
    }
    console.log(resendOtp)
    if(otp!=resendOtp[0].otp){
        return res.status(403).json({
            sucess:false,
            message:"OTP do not match"
        })
    }

    // hashpassword
        const hashpassword=await bcrypt.hash(password,10)
        console.log("password hash ",hashpassword)
       
        const profileCreate=await profile.create({
            fullname:null,
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null,
            about:null
        })
   
       const user=await userModel.create({
        firstName,
        lastName,
        email,
        password,
        confirmpassword,
        contact:parseInt(contact),
        additionalDetails:profileCreate._id,
        accountType,
        otp:parseInt(otp)
       })
       return res.status(200).json({
        sucess:true,
        message:"user register sucessfully",
        user:user
       })
    }catch(error){
        console.log("error in sign up user")
        return res.status(404).json({
        sucess:false,
        message:`user can not register try again ${error}`
       })
    }
    // create in DB
}


// login function
exports.login=async (req,res)=>{
    try{
    // fetch data
    const {email,password}=req.body
    // validation
    if(!email||!password){
        return res.status(401).json({
            sucess:false,
            message:"Enter all data that are required"
        })
    }
    // cheak if email exist
    const user=await userModel.findOne({email})
    if(!user){
        return res.status(401).json({
            sucess:false,
            message:"user not exist please sign up first"
        });
    }
    const hashpassword=user.password
    // password cheak
    const result=bcrypt.compare(password,hashpassword)
    if(!result){
        return res.status(402).json({
            sucess:false,
            message:"please enter a correct password"
        })
    }
    // jwt token 
    const payload={
        email:user.email,
        _id:user._id,
        accountType:user.accountType
    }
    console.log(payload)
    const token=await JWT.sign(payload,process.env.JWT_SECRET,{
        expiresIn:"12h"
    })
    user.token=token;
    user.password=undefined
    // cookies enter
    const options={
        expires:new Date(Date.now()+3*24*60*60*100),
        httpOnly:true
    }
    res.cookie("token",token,options).status(200).json({
        sucess:true,
        message:'user login sucessfully',
        token,
        user,
    })
}catch(error){
    return res.status(500).json({
        sucess:true,
        message:"login falier pleade try again"
    })
}
}


// otp send
// fetch email from request body
exports.sendOtp=async(req,res)=>{
   try {
    const {email}=req.body
    console.log(email)
//    cheak user already exist
   const userExist=await userModel.findOne({email})
   if(userExist){
      return res.status(401).json({
        sucess:"false",
        message:"user already exist"
      })
   }

   // generating otp
   let otp=optGenerater.generate(6,{
    upperCaseAlphabets:false,
    lowerCaseAlphabets:false,
    specialChars:false
   })

   // cheak unique otp
   const result=await otpModel.findOne({otp})
   while(result){
    otp=optGenerater.generate(6,{
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false
       })
      result=await otpModel.findOne({otp})
   } 

   const payload={
    email:email,
    otp:otp
   }
   //send this otp to email
    console.log(email)
    let transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.MAIL_USER,
            pass:process.env.MAIL_PASS
        }
    })
    
    // const sendMailAsync = util.promisify(.sendMail).bind(transporter);

    const info=await transporter.sendMail({
        from:process.env.MAIL_USER,
        to:email,
        otp:otp,
        text:otp
    })
   console.log("info",info)
   // save otp
   const optcreate=await otpModel.create({
    otp:otp,
    email:email
   })
   console.log(optcreate)
   // returnnresponse

   
   return res.status(200).json({
    sucess:"true",
    message:info
   })

   } catch (error) {
      return res.status(404).json({
        sucess:"failer",
        message:`error in creating otp ${error}`
      })
   }
}



// change password

exports.changePassword=async(req,res)=>{
   try {
    // fetch data
     const{email,password,confirmpassword}=req.body
     // validata
     if(!email||!password||!confirmpassword){
      return res.status(402).json({
        sucess:false,
        message:"please enter all Data"
      })
     }

     if(password!==confirmpassword){
        return res.status(402).json({
            sucess:false,
            message:"password and confirm password donot match"
          })
     }

     const user=await userModel.findOne({email})
     if(!user){
        return res.status(404).json({
            sucess:false,
            message:'user doesnot exist'
        })
     }

     const newUser=await userModel.updateOne({email},{
        password:password,
        confirmpassword:confirmpassword
     })
     console.log(newUser)

     res.status(200).json({
        sucess:true,
        message:"password change sucessfully"
     })

   } catch (error) {
     return res.status(200).json({
        sucess:false,
        message:'error is changing password'
     })
   }
}