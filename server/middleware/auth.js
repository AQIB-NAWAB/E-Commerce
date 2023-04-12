const catchAsyncError=require("./catchAsyncError")

const jwt=require("jsonwebtoken")
const User=require("../models/userModel")
const CustomError = require("../utils/errorhandler")
exports.isAuthenticatedUser=catchAsyncError(async(req,res,next)=>{
    const {token}=req.cookies
    if(!token){
        return next(new CustomError("Please Login to access the resoures ",401))
    }

    const decoded=await jwt.verify(token,process.env.JWT_SECRET)

req.user=await User.findById({_id:decoded.id})

next()

})


exports.authorizeRoles=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
           return next(  new  CustomError(`Role: ${req.user.role} is not allowed to access this  resource`,403 )
           )
        }
        next()
    }
}