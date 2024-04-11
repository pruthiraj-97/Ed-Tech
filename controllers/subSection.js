const subsection=require('../models/subsection.model')
const {uploadVideoInCloudinary}=require('../utils/videoUpload')
const Section=require('../models/section.model')
exports.createSubSection=async(req,res)=>{
    // fetch data
    try {
         const {sectionId,title,
          description,
          timeduration,
         }=req.body
        const file=req.files.videoFile
         // validation data
         if(!sectionId||!title||!description||!timeduration||!file){
             return res.status(404).json({
                 sucess:false,
                 message:'please enter all data'
             })
         }
         const folder=process.env.VIDEO_FOLDER
         // upload video in cloudinary
         const videoUrl= await uploadVideoInCloudinary(file,folder)
         console.log(videoUrl)
         // create subsection
         const createdsubSection=await subsection.create(
            {title,
            description,
            timeduration,
            videoUrl:videoUrl.secure_url
            })
         // update in section model
       const updatedSection= await Section.updateOne({_id:sectionId},{
           $push:{
            subSection:createdsubSection._id
           }
         })

        return res.status(200).json({
            sucess:true,
            message:'subsection created successfully',
            updatedSectionn:updatedSection
         })
    } catch (error) {
        return res.status(404).json({
            sucess:false,
            message:`error in creating subsection ${error}`
        })
    }
}

// updateSubsection

exports.updateSubSection=async(req,res)=>{
   try {
       const {title}=req.body
       const id=req.params.id
       const updateSubSection=await subsection.updateOne({_id:id},{
            title:title
       },{new:true})

       return res.status(200).json({
           sucess:true,
           message:updateSubSection
       })
   } catch (error) {
       return res.status(404).json({
           sucess:false,
           message:`error in deleting subsection ${error}`
       })
   }
}

//delete subsection

exports.deleteSubSection=async (req,res)=>{
    try {
        //fetch the data
   const {subSectionId,sectionId}=req.body
   // delete the data
   const deletedsubSection=await subsection.deleteOne({_id:subSectionId})
   const updateSection=await Section.updateOne({_id:sectionId},{
    $pull:{
        subSection:subSectionId
    }
   })
   return res.status(200).json({
       sucess:true,
       message:'Delete subsection sucsessfully',
       deletedsubSection:deletedsubSection
   })
    } catch (error) {
        return res.status(404).json({
            sucess:false,
            message:'error in deleting subsection'
        })
    }

}