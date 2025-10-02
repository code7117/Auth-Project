const nodemailer = require('nodemailer');
const { otpTemplate, welcomeTemplate, resetPasswordOtpTemplate } = require('../EmailTemplate/email');


const mailhelper = new Object()


mailhelper.sendMail = async(email,name)=>{
    let config = {
        service:"gmail",
        auth:{
            user:process.env.user,
            pass:process.env.pass
        }
    }
    let transporter = nodemailer.createTransport(config);
    let message = {
        from:'adharsh7117@gmail.com',
        to:email,
        // subject:subject,
        html:welcomeTemplate(email,name)//use the template for html
    };
    try {
        let info = await transporter.sendMail(message);
        console.log('success',info);
        return{status:true,info};
        
    } catch (err) {
        console.log("failed",err);
        return{status:false,error:err}
        
    }
}

// =======================
// SEND OTP EMAIL
// =======================
mailhelper.sendOtpMail = async (email, name, otp) => {
  let config = {
    service: "gmail",
    auth: {
      user: process.env.user,
      pass: process.env.pass
    }
  };

  let transporter = nodemailer.createTransport(config);

  let message = {
    from: 'adharsh7117@gmail.com',
    to: email,
    subject: "Your OTP Code",
    html: otpTemplate(name, otp) // Using OTP template
  };

  try {
    let info = await transporter.sendMail(message);
    console.log('OTP Mail sent successfully:', info);
    return { status: true, info };
  } catch (err) {
    console.log("OTP Mail failed:", err);
    return { status: false, error: err };
  }
};

// reset password mail

mailhelper.sendresetOtpMail = async (email, name, otp) => {
  let config = {
    service: "gmail",
    auth: {
      user: process.env.user,
      pass: process.env.pass
    }
  };

  let transporter = nodemailer.createTransport(config);

  let message = {
    from: 'adharsh7117@gmail.com',
    to: email,
    subject: "Your OTP Code",
    html: resetPasswordOtpTemplate(name, otp) // Using OTP template
  };

  try {
    let info = await transporter.sendMail(message);
    console.log('OTP Mail sent successfully:', info);
    return { status: true, info };
  } catch (err) {
    console.log("OTP Mail failed:", err);
    return { status: false, error: err };
  }
};
module.exports=mailhelper