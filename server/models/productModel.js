const mongoose=require("mongoose")



const productSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter product Name"]
    },
    description:{
        type:String,
        required:[true,"Please Enter product Description"]
    },
    price:{
        type:Number,
        required:[true,"Please Enter product Price"],
        maxLenght:[8,"Price cannot exceed 8 characters"]
    },
    ratings: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
      },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required:[true,"Please Enter product Category"]
    },
    stock:{
        type:Number,
        required:[true,"Please Enter product Stock"],
        maxLenght:[4,"Stock cannot exceed 4 characters"],
        default:1
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
                required:true
            },
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})


module.exports=mongoose.model("Product",productSchema)