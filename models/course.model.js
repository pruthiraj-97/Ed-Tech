const mongoose=require('mongoose')
const courseModel=new mongoose.Schema({
    courseName:{
        type:String,
        require:true
    },
    courseDescription:{
        type:String,
        require:true
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userModel",
        require:true
    },
    WhatYouWillLearn:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    thumbnail:{
        type:String,
        require:true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Category",
    },
    courseContent:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Section",
            require:true
        }
    ],
    ratingAndReviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"RatingAndReview"
        }
    ],
    studentEnrolled:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"userModel",
            require:true
        }
    ]
})

module.exports=mongoose.model("courseModel",courseModel)