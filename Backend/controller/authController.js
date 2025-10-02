const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const mailhelper = require('../helper/mailhelper');

const authController = new Object();

// Register Controller
authController.Register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return { status: false, message: 'Missing Details' };
    }

    // Validate email format
    if (!validator.isEmail(email)) {
        return { status: false, message: 'Invalid Email Format' };
    }

    try {
        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return { status: false, message: "User already exists" };
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        });
        await user.save();

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });



        if (user) {
            // const subject = "welcome to king "
            console.log(user.email, user.name)
            await mailhelper.sendMail(user.email, user.name,)
        }


return {
    status: true,
    message: "Register successful",
    token: token,
    data: user
};
    } catch (err) {
        console.log(err);
        return { status: false, message: 'Server Error' };
    }
};

// Login Controller
authController.Login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return { status: false, message: "Email and Password are required" };
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return { status: false, message: "Invalid Email" };
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return { status: false, message: "Invalid Password" };
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
return {
    status: true,
    message: "Login successful",
    token: token,
    data: user
};



    } catch (err) {
        console.log(err);
        return { status: false, message: 'Server Error' };
    }
};

// Logout Controller
authController.Logout = async (req, res) => {
    try {
     res.clearCookie('token', token, {
    httpOnly: true,
    secure: true, // must be true in production with HTTPS
    sameSite: 'none', // allows cross-origin
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
});
        return { status: true, message: "Logged Out" };
    } catch (err) {
        console.log(err);
        return { status: false, message: 'Server Error' };
    }
};


// authController.sendVerifyOtp = async(req,res)=>{
//     try{

//         const userId = req.body;
//         const user = await userModel.findById(userId)

// if(user.isAccountVerified){
//     return{status:false,message:"Account already verified"}
// }
// const otp = String(Math.floor(100000 + Math.random()*900000));

// user.verifyOtp = otp;
// user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000
// await user.save();

//     if(user){

//             console.log(user.email,user.name,otp)
//             await mailhelper.sendMail(user.email,user.name, otp)
//         }
//         return{status:true,message:"verification OTP sent on Email"}

//     }catch(err){
//         console.log(err)

//     }
// }
authController.sendVerifyOtp = async (req, res) => {
    try {
        const userId = req.userId; // ✅ Use the ID set by userAuth middleware
        const user = await userModel.findById(userId);

        if (!user) {
            return { status: false, message: "User not found" };
        }

        if (user.isAccountVerified) {
            return { status: false, message: "Account already verified" };
        }

        // Generate OTP
        const otp = String(Math.floor(100000 + Math.random() * 900000));

        // Save OTP and expiry
        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;
        await user.save();

        // Send OTP
        console.log(user.email, user.name, otp);
        await mailhelper.sendOtpMail(user.email, user.name, otp);

        return { status: true, message: "Verification OTP sent to email" };
    } catch (err) {
        console.error(err);
        return { status: false, message: "Server error" };
    }
};


authController.verifyEmail = async (req, res) => {
    const { otp } = req.body;
    const userId = req.userId;



    if (!userId || !otp) {
        return { status: false, message: "missing Details" }
    }
    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return { status: false, message: "User not found" }
        }
        console.log("OTP from DB:", user.verifyOtp);
        console.log("OTP from User:", otp);
        if (user.verifyOtp === '' || user.verifyOtp !== otp) {
            return { status: false, message: 'Invalid OTP' };

        }
        if (user.verifyOtpExpireAt < Date.now()) {
            return { status: false, message: 'OTP Expired' }
        }
        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;

        await user.save();
        return { status: true, message: 'Email verified succesfully' }
    } catch (err) {
        console.log(err)

    }
}

//check if user Authenticated
// authController.isAuthenticated = async (req, res) => {

//     try {
//         const userId = req.params.id
//         const user = await userModel.findById(userId)
//              const token = jwt.sign({ id:user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
//         res.cookie('token', token, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === 'production',
//             sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
//             maxAge: 7 * 24 * 60 * 60 * 1000
//         });
//         return { status: true,token }
        
//     } catch (err) {
//         console.log(err)
//     }
// }

authController.isAuthenticated = async (req, res) => {
  try {
    // ✅ Get token from cookie
    const token = req.cookies.token;
    if (!token) {
      return { status: false, message: "Not authorized" };
    }

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id).select("-password");

    if (!user) {
      return { status: false, message: "User not found" };
    }

    // ✅ Console the token
    console.log("Token from cookie:", token);

    return{ status: true, user };
  } catch (err) {
    console.error("isAuthenticated error:", err);
    return { status: false, message: "Invalid or expired token" };
  }
};
//send password reset otp
authController.sendResetOtp = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return { status: false, message: 'Email is Required' }
    }
    try {
        const user = await userModel.findOne({ email })
        if (!user) {
            return { status: false, message: 'user not found' }
        }
        // Generate OTP
        const otp = String(Math.floor(100000 + Math.random() * 900000));

        // Save OTP and expiry
        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000;
        await user.save();

        // Send OTP
        console.log(user.email, user.name, otp);
        await mailhelper.sendresetOtpMail(user.email, user.name, otp);
        return { status: true, message: "OTP sent to your email" }
    } catch (err) {
        console.log(err)
    }
}

authController.resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
        return { status: false, message: 'Email, OTP, and    new password are required' }

    }
    try {
        const user = await userModel.findOne({email})
        if(!user){
            return{status:false,message:"user not found"};
        }
        if(user.resetOtp === "" || user.resetOtp !== otp){
            return{status:false,message:'Invalid OTP'}
        }
        if(user.resetOtpExpireAt < Date.now()){
            return{status:false,message:"Otp Expired"}
        }
        const hashedPassword = await bcrypt.hash(newPassword,10);
        user.password = hashedPassword;
        user.resetOtp;
        user.resetOtpExpireAt = 0;


        await user.save()
        return{status:true,message:"Password has been reset successfully"}
        
    } catch (err) {
        console.log(err)
    }
}

module.exports = authController;
