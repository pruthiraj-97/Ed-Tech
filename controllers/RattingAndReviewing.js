const mongoose=require('mongoose')
const userModel=require('../models/user.model')
const course=require('../models/course.model')
const ratingAndReviews=require('../models/RatingAndReviewing.model')
// create ratting ans reviewing
exports.createRatingAndReview=async(req,res)=>{
     try {
        // fetch data
        const {courseId,rating,review}=req.body
        // validate 
        if(!courseId||!rating||!review){
            return res.status(402).json({
                sucess:false,
                message:"enter all details "
            })
        }
        const userId=req.user._id
        const findCourse=await course.findOne({_id:courseId})
        // if student not enrolled the course
        const enrolledStudents = findCourse.studentEnrolled;
        const isEnrolled = enrolledStudents.includes(userId);
        if (!isEnrolled) {
            return res.status(404).json({
                success: false,
                message: "Student is not enrolled in the course"
            });
        }
        // if user already give rating
        const reviewArray=findCourse.ratingAndReviews // review array if id
        if(reviewArray.includes(userId)){
            return res.status(404).json({
                sucess:false,
                message:"user already gave the review"
            })
        }

        //create review
        const newReview=await ratingAndReviews.create({
            user:userId,
            rating:parseInt(rating),
            review:review,
            course:courseId
        })
        // update in course ratting and review
       const newCourse=await course.updateOne({_id:courseId},{
            $push:{
                ratingAndReviews:newReview._id
            }
        },{new:true})
        return res.status(200).json({
            sucess:true,
            message:"Review send sucessfully ",
            newReview
        })
     } catch (error) {
        return res.status(404).json({
            sucess:false,
            message:`error in sending review ${error}`
        })
     }
}

// getting average ratting of a perticular course
exports.getAvrageRatting=async(req,res)=>{
   try {
      // fetch all data which is only course id 
      const {courseId}=req.body
      // find average ratting of this course
       const getCourse=await course.findById(courseId)
       const allRating=getCourse.ratingAndReviews
       // giving error in ths algo
       let sum=0
        // allRating.forEach(async(elem) => {
        //     const getRating=await ratingAndReviews.findOne({_id:elem})
        //     sum+=parseInt(getRating.rating)
        //      console.log(sum)
        // });

        await Promise.all(allRating.map(async (elem) => {
            try {
                const getRating = await ratingAndReviews.findOne({ _id: elem });
                sum += parseInt(getRating.rating);
                console.log(sum);
            } catch (error) {
                console.error('Error fetching rating:', error);
                // Handle the error as needed
            }
        }));
        
    // console.log(sum,allRating.length)
    let avgRating=parseFloat(sum/allRating.length)
    // Method 2

    return res.status(200).json({
        sucess:true,
        message:"find average rating sucessfully ",
        avgRating
    })
   } catch (error) {
     return res.status(404).json({
        sucess:false,
        message:`error in finding average ratting ${error}`,
     })
   }
}

// getAll ratting of specific courseId
exports.getAllReviewOfType=async(req,res)=>{
    try {
        // fetch the course id 
        const {courseId}=req.body
        // getData from DB and populate
        const getCourse=await course.findById(courseId).populate("ratingAndReviews")
        const allReview=getCourse.ratingAndReviews
        return res.status(200).json({
            sucess:true,
            message:"find all rating sucessfully ",
            allReview
        })

    } catch (error) {
        return res.status(404).json({
            sucess:false,
            message:`error in geting all rating ${error}`
        }) 
    }
}
// get All review
exports.getAllreview=async(req,res)=>{
   try {
      // fetch the data
      const allReview=await ratingAndReviews.find({})
                                            .sort({rating:"desc"})
                                            .populate({
                                                path:"user",
                                                select:"firstName lastName image" // which part we need to do
                                            })
                                            .populate({
                                                path:"courses",
                                                select:"courseName"
                                            })
                                            .exec();
        return res.status(200).json({
            sucess:true,
            message:"All rating fetch sucessfully ",
            allReview
        })



   } catch (error) {
     return res.status(404).json({
        sucess:false,
        message:`error in finding all reviews ${error}`
     })
   }
}