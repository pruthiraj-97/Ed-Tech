const cloudinary=require('cloudinary').v2

exports.uploadVideoInCloudinary=async(file,folder)=>{
        try {
          console.log(file, folder);
      
          if (!file || !file.tempFilePath) {
            throw new Error('Invalid file parameter. Make sure it has a textFilePath property.');
          }
      
          return await cloudinary.uploader.upload(file.tempFilePath, {
            resource_type: 'video', // type of data
            folder: folder // in which folder
          });
        } catch (error) {
          console.error('Error uploading video to Cloudinary:', error.message);
          throw error; // Rethrow the error or return a meaningful response
        }
}