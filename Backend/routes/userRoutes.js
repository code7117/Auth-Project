const express = require('express');
const userAuth = require('../middleware/userAuth');
const userController = require('../controller/userController/userController');

const userRouter = express.Router();

userRouter.get('/data',userAuth,async(req,res)=>{
    try{
    const result = await userController.getUserData(req);
    res.send(result)
    }catch(err){
console.log(err)
    }
})
module.exports=userRouter