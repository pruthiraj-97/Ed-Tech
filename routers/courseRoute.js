const express=require('express')
const router=express.Router()
const {createCategory,getAllCategory}=require('../controllers/category')
const {createCourse,getCourseDetails,getCourseBydesc,getCourseByasc}=require('../controllers/course')
const {Auth,isAdmin,isInstructor,isStudent}=require('../middlewares/authetic')
const {createSection,deleteSection}=require('../controllers/section')
const {createSubSection,deleteSubSection,updateSubSection}=require('../controllers/subSection')
const {createRatingAndReview,getAllReviewOfType,getAvrageRatting}=require('../controllers/RattingAndReviewing')
// create Category
router.post('/createCategory',Auth,isAdmin,createCategory)
// get all category
router.get('/getAllCategory',Auth,getAllCategory)
//create course
router.post('/createCourse',createCourse)

//add sections
router.post('/addSection',Auth,isInstructor,createSection)

//get course details
router.get('/getCourseDetails',Auth,getCourseDetails)
//add subsection
router.post('/addSubSection',Auth,createSubSection)
//post course review
router.post('/courseReview',Auth,isStudent,createRatingAndReview)
//get all review
router.get('/getAllReview',Auth,isStudent,getAllReviewOfType)
//getAveragereview of perticular course
router.get('/getCourseBydesc',Auth,getCourseBydesc)    
//get course in decressing order
router.get('/getCourseByasc',Auth,getCourseByasc)

//detele section route
router.delete('/deleteSection',Auth,isInstructor,deleteSection)
// delete subsection
router.delete('/deleteSubSection',Auth,isInstructor,deleteSubSection)
//update subsection
router.put('/updateSubSection/:id',Auth,isInstructor,updateSubSection)
module.exports=router