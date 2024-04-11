const express=require('express')
const router=express.Router()
const {signUp,login,changePassword}=require('../controllers/Auth')
const {Auth,isAdmin,isInstructor,isStudent}=require('../middlewares/authetic')
const {uploadVideoInCloudinary}=require('../controllers/course')
const {createSubSection}=require('../controllers/subSection')
const {createCourse}=require('../controllers/course')
const {createCategory,getAllCategory}=require('../controllers/category')
// home page route
router.get('/home',(req,res)=>{
    res.send("in home route")
})
//signup route
router.post('/signup',signUp) // done
//login route
router.post('/login',login) // done
// change password route
router.post('/changepassword',Auth,changePassword) // done

// create subsection
router.post('/createsubsection',Auth,isAdmin,createSubSection) // done
// create course
router.post('/createcourse',Auth,isInstructor,createCourse)

// create category route
router.post('/createcategory', Auth, isAdmin, createCategory) // done

// getAllCategory categoty
router.get('/getAllCategory', Auth, isAdmin,getAllCategory) // done

// create course 
router.post('/createcourse',Auth,isInstructor,createCourse) // done
module.exports=router