const mongoose=require('mongoose')
const otpModel=new mongoose.Schema({
    otp:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60
    }
})
otpModel.pre("save",async function(next){
     console.log(this.otp,this.email);
     next();
})

module.exports=mongoose.model("OTP",otpModel)