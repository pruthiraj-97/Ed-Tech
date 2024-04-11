const nodemailer=require('nodemailer')
const util = require('util')
exports.sendEmail=async(email)=>{
    try {
        console.log(email)
        let transporter=nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
        })

        const info=await transporter.sendMail({
            from:process.env.MAIL_USER,
            to:email,
            subject:'test',
            text:'this is test mail'
        })
        // console.log(info)
    } catch (error) {
        console.log(error)
    }
    
}