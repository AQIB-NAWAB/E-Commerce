const CustomError=require("../utils/errorhandler")
const catchAsyncError=require("../middleware/catchAsyncError")
const User=require("../models/userModel")
const Product=require("../models/productModel")
const sendToken=require("../utils/jwtToken")
const sendEmail=require("../utils/sendEmail.js")
const crypto=require("crypto")
const cloudinary=require("cloudinary")
const fs = require('fs');


    exports.registerUser = catchAsyncError(async (req, res, next) => {
        try {
            const isUserAlreadyExist=await User.findOne({email:req.body.email})
            if(isUserAlreadyExist){
                return next(new CustomError("User Already Exist"),400)
            }
        
        const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatars",
            width: 300,
            crop: "scale",
        });
    
        const { name, email, password } = req.body;
        const user = await User.create({
            name,
            email,
            password,
            avatar: {
            public_id: result.public_id,
            url: result.secure_url,
            },
        });
    
        sendToken(user, 201, res);
        } catch (error) {
        console.log(error);
        }
    });
  
// Login User

exports.loginUser=catchAsyncError(async(req,res,next)=>{
    const {email,password}=req.body
    // Checking the user has given password and email
    if(!email || !password){
        return next(new CustomError("Please Enter Email & Password"),400)
    }

    const user=await User.findOne({email}).select("+password")
    if(!user){
        return next(new CustomError("Invalid Email & Password"),400)
    }

    const isPasswordMatched=await  user.comparePassword(password)

    if(!isPasswordMatched){
        return next(new CustomError("Invalid Email & Password"),400)
    }
    sendToken( user,200,res)
})


//logout 
exports.logout=catchAsyncError(async(req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(0),
        httpOnly:true
    })  
    res.status(200).json({
        success:true,
        message:"Logout"
    })
})


exports.forgatPassword=catchAsyncError(async(req,res,next)=>{
    const user=await User.findOne({email:req.body.email})
    if(!user){
        return next(new CustomError("User Not Found"))
    }

    // Get reset Password Token
    const resetToken= user.getResetPasswordToken()
    await user.save({validateBeforeSave:false})
    const resetPasswordUrl= `${req.protocol}://${req.get("host")}/api/v1/password/reset/
    ${resetToken}`

    const message=`Your Password reset token is :- \n\n  ${resetPasswordUrl} If you have not requested  this email ,then ignore it.`

    try{

await sendEmail({
    email:user.email,
    subject:"Ecomerce Password Recovery",
    message,

})

res.status(200).josn({
    success:true,
    message:`Email sent to ${user.email} successfuly    `
})


    }catch(error){
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined
        await user.save({validateBeforeSave:false})

        return next(new CustomError(error.message,500))
    }
})


exports.resetPassword=catchAsyncError(async(req,res,next)=>{
    const resetPasswordToken=crypto.createHash("sha256")
    .update(req.params.token)
    .digest("hex")
    const user=await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()}

    })
    
    if(!user){
        return next(new CustomError("Reset Password Token is invalid or has benn declared"))
    }

    if(req.body.password!==req.body.confirmPassword){
        return next(new CustomError("Password  does Not Macted"),400  )
    }
    user.password=req.body.password;
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined

    await user.save()

    sendToken(user,200,res)

}) 


// Get User detials

exports.getUserDetails=catchAsyncError(async(req,res,next)=>{

    const user=await User.findById(req.user.id)


    res.json({
        success:true,
        user,
    })
})


// Update User Password
exports.updatePassword=catchAsyncError(async(req,res,next)=>{
    const user=await User.findById(req.user.id).select("+password")

    const isPasswordMatched=await  user.comparePassword(req.body.oldPassword || "")

    if(!isPasswordMatched){
        return next(new CustomError("Password Does not Macted With old One"))
    }

    if(req.body.newPassword!==req.body.confirmPassword){
        return next(new CustomError("Password and Confirm does Not Machted" ))
    }
    user.password=req.body.newPassword

    await user.save()
    sendToken(user,200,res)



})


// Update User Profile
exports.updateProfile=catchAsyncError(async(req,res,next)=>{
    const newUserData={
        name:req.body.name,
        email:req.body.email
    }
    const user=await User.findByIdAndUpdate(req.user,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success:true
    })
})

// get all users  {Admin} 

exports.getAllUser=catchAsyncError(async(req,res,next)=>{
    const users=await User.find()
    res.status(200).json({
        success:true,
        users
    })
})


// get the Single User  {Admin}
exports.getSingleUser=catchAsyncError(async(req,res,next)=>{
    const user=await User.findById(req.params.id)
    if(!user){
        return next(new CustomError("User not Found"),400)
    }

    res.status(200).json({
        success:true,
        user

    })
})

// Update User Profile {Admin}

exports.updateUserRole=catchAsyncError(async(req,res,next)=>{
    const userData={
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
    }
const user_exist=await User.findById(req.params.id)
if(!user_exist){
    return next(new CustomError(`User Does Not Exist with this id: ${req.params.id}`))
}
    const user=await User.findByIdAndUpdate(req.params.id,userData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    await user.save()

    res.status(200).json({
        success:true
    })
})



// Delete The User 


exports.deleteUser=catchAsyncError(async(req,res,next)=>{
const user=await User.findById(req.params.id).lean();
if(!user){
    return next(new CustomError(`User Does Not Exist with this id: ${req.params.id}`))
}
    

    await User.findByIdAndDelete(req.params.id)

    res.status(200).json({
        success:true,
        message:"User Deleted Successfuly"
    })
})

