const {instance}=require('../config/razorpay')

const Course=require('../models/course.model')
const userModel=require('../models/user.model')

//capture payment
exports.capturePayment=async(req,res)=>{
    //get courseId and userId
    const {courseId,userId}=req.body
    //validation
    if(!courseId ||!userId){
        res.status(404).json({
            success:false,
            message:"courseId and userId is required"
        })
    }

    try {
        //validCourseId and userId
        const courseFind=await Course.findById(courseId)
        if(!courseFind){
        res.status(404).json({
            message:"no such course find",
        })
       }

       //order create
       const amount=courseFind.price
       const currency="INR"
       const options={
        amount:amount*100,
        currency,
        receipt:toString(1),
        notes:{
            courseId:courseFind._id,
            userId:userId
        }
       }
       const order=await instance.orders.create({
           
       })

       try {
         const paymentResponse=await instance.orders.create(options)
         console.log("payment response",paymentResponse)
         res.status(200).json({
            courseId:courseFind._id
        })
       } catch (error) {
         console.log("error in creating order")
         res.status(404).json({
             message:"error in creating order"
         })
       }
    } catch (error) {
        
    }
    //return payment link
}

exports.veryfyPayment=async(req,res)=>{
    try {
        //match the secrete from server and razorpay
        const hookSecret=process.env.RAZORPAY_KEY_SECRET
        const signature=req.headers['x-razorpay-signature']
        //hashing algorithim for encrypt formate algo secrete
        const shasum=crypto.createHmac('sha256',hookSecret);
        //convert to string
        shasum.update(JSON.stringify(req.body));
        //digest to haxadecimal formate
        const digest=shasum.digest('hex')
        //if match
        if(signature===digest){
            //enrollmentof student
              console.log("payment accepted")
              const {userId,courseId}=req.body.payload.payment.entity.notes
              //add student in course
              const enrolledCourse=await Course.updateOne({_id:courseId},{
                $push:{
                    studentEnrolled:userId
                }
              },{new:true})
                    
              if(!enrolledCourse){
                return res.status(404).json({
                    message:"course not found"
                })
              }

              // add course in user
              await userModel.updateOne({_id:userId},{
                $push:{
                    courses:courseId
                }
              },{new:true})


            res.status(200).json({
                sucess:true,
                message:"payment verified"
            })
        }
        else{
            res.status(404).json({
                success:false,
                message:"payment not verified"
            })
        }

    } catch (error) {
        
    }
}