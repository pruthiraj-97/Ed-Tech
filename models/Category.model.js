const mongoose=require('mongoose')
const Category=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    course:[ // Arrayof course
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"courseModel"
    }
    ]
})

module.exports=mongoose.model("Category",Category)