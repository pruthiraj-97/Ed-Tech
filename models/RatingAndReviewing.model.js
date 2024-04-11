const mongoose=require('mongoose')
const RatingAndReviewing=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userModel"
        },
    rating:{
        type:Number,
        require:true
    },
    review:{
        type:String,
        require:true
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"courseModel"
    }
})

module.exports=mongoose.model("RatingAndReview",RatingAndReviewing)