const mongoose=require('mongoose')
const sectionSchema=mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    subSection:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"subsection"
        }
    ]
})
module.exports=mongoose.model("section",sectionSchema)