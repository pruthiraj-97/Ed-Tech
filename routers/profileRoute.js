const express=require('express')
const router=express.Router()
const {updateProfile,getUserDetails,deleteProfile}=require('../controllers/profile')
const {Auth}=require('../middlewares/authetic')

router.post('/updateprofile',Auth,updateProfile)
router.get('/getUserDetails',Auth,getUserDetails)
//delete profile
router.delete('/deleteProfile',Auth,deleteProfile)

module.exports=router