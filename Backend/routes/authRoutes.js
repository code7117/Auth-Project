const express= require('express')
const authController = require("../controller/authController")
const userAuth = require('../middleware/userAuth')

const authRouter = express.Router();

authRouter.post('/register',async(req,res)=>{
    try {
        const result = await authController.Register(req,res)
        res.send(result)
        
    } catch (err) {
        console.log(err)
        
    }
})
authRouter.post('/login',async(req,res)=>{
    try {
        const result = await authController.Login(req,res)
        res.send(result)
        
    } catch (err) {
        console.log(err)
        
    }
})
authRouter.post('/logout',async(req,res)=>{
    try {
        const result = await authController.Logout(req,res)
        res.send(result)
        
    } catch (err) {
        console.log(err)
        
    }
})
authRouter.post('/send-verify-otp', userAuth,async(req,res)=>{
    try {
        const result = await authController.sendVerifyOtp(req,res)
        res.send(result)
        
    } catch (err) {
        console.log(err)
        
    }
});

authRouter.post('/verify-Account', userAuth,async(req,res)=>{
    try {
        const result = await authController.verifyEmail (req,res)
        res.send(result)
        
    } catch (err) {
        console.log(err)
        
    }
})
authRouter.get('/is-auth', userAuth,async(req,res)=>{
    try {
        const result = await authController.isAuthenticated (req,res)
        res.send(result)
        
    } catch (err) {
        console.log(err)
        
    }
})
authRouter.post('/sent-reset-otp', async(req,res)=>{
    try {
        const result = await authController.sendResetOtp (req,res)
        res.send(result)
        
    } catch (err) {
        console.log(err)
        
    }
})
authRouter.post('/reset-password', async(req,res)=>{
    try {
        const result = await authController.resetPassword(req,res)
        res.send(result)
        
    } catch (err) {
        console.log(err)
        
    }
})
module.exports=authRouter