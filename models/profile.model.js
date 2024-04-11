const mongoose=require('mongoose')
const profile=new mongoose.Schema({
     fullname:{
        type:String,
        require:true
     },
     email:{
        type:String,
        require:true
     },
     gender:{
        type:String,
        require:true
     },
     dateOfBirth:{
        type:String,
        require:true
     },
     about:{
        type:String,
        require:true,
        trim:true
     },
     contactNumber:{
        type:Number,
        require:true
     }
   //   profilepic:{
   //    type:String,
   //    require:true
   //   }
})
module.exports=mongoose.model("profile",profile)