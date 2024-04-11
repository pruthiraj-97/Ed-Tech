const express=require('express')
const router=express.Router()
const {signUp,login,changePassword,sendOtp}=require('../controllers/Auth')
const {Auth,isAdmin,isInstructor,isStudent}=require('../middlewares/authetic')
//sendOtp
router.post('/sendotp',sendOtp)
//signup route
router.post('/signup',signUp) // done
//login route
router.post('/login',login) // done
// change password route
router.post('/changepassword',Auth,changePassword) // done

// getuser details route
router.get('/changePassword',Auth,changePassword)

module.exports=router