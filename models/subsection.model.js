const mongoose=require('mongoose')
const subsection=new mongoose.Schema({
     title:{
       type:String,
       require:true
     },
     description:{
      type:String,
      require:true
     },
     timeduration:{
         type:String
     },
     videoUrl:{
        type:String
     }
})

module.exports=mongoose.model("subsection",subsection)