const userModel = require('../../models/userModel')
const userController = new Object()

userController.getUserData = async(req,res)=>{
    try{
    const userId= req.userId;
        console.log("User ID from middleware:", userId); // Debugging
    const user = await userModel.findById(userId);
    console.log(user)

    if(!user){
        return{status:false,message:"User not found"}
    }
        //  const userData = {
        // name:user.name,
        // isAccountVerified:user.isAccountVerified}
    return{status:true, data:user}

}catch(err){
console.log(err)
}
}

module.exports = userController