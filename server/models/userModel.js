const mongoose=require("mongoose")
const validator=require("validator")
const bcrypt=require("bcrypt")
const jwt = require("jsonwebtoken")
const crypto=require("crypto")
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        rqeuired:[true,"Please enter name"],
        maxLenght:[30,"Name cannot Exceed 30 Character "]
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:[validator.isEmail,"Please Enter a valid Email"],  
        },
        password:{
            type:String,
            required:[true,"Please Enter Your Password"],
            minlength:[8,"password should br greater than 8 character "],
            select:false,
        },
        avatar:{
            
                public_id:{
                    type:String,
                    required:true
                },
                url:{
                    type:String,
                    required:true
                }     
        }
    ,
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
    createdAt:{
        type:Date,
        default:Date.now()
    }
    
})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next()
    }

    this.password=await bcrypt.hash(this.password,10)
})
// JWT TOKEN
userSchema.methods.getJWTToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{      
        expiresIn:process.env.JWT_EXPIRE
    })
}

//Compare Password
userSchema.methods.comparePassword=async function(enteredPassword){
    return await  bcrypt.compare(enteredPassword,this.password)

}


// reset the password
userSchema.methods.getResetPasswordToken=function(){
    const resetToken=crypto.randomBytes(20).toString("hex")

    this.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex")

    this.resetPasswordExpire=Date.now()+15*60*1000
    return resetToken
}



module.exports=mongoose.model("User",userSchema)