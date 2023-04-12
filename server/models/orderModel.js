const mongoose=require("mongoose")

const orderSchema=new mongoose.Schema({
    shippingInfo:{
        address:{type:String,required:true},
        city:{type:String,required:true},
        state:{type:String,required:true},
        country:{type:String,required:true},
        pinCode:{
            type:Number,
            required:true
        },
        phoneNo:{
            type:String,
            required:true
        }
    },
    orderItems:[
        {
            name:{
                type:String,
                required:true
            },
            price:{
                type:Number,
                required:true
            },
            quantity:{
                type:Number,
                required:true
            },
            image:{
                type:String,
                required:true
            },
            product:{
                type:mongoose.Schema.ObjectId,
                ref:"Product",
                required:true
            }
        }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    paymentInfo:{
        id:{
            type:String,
            required:true
        },
        status:{
            type:String,
            reqiured:true
        },
        paidAt:{
            type:Date,
            required:true
        },
        itemsPrice:{
            type:Number,
            default:0,
            reqiured:true

        },
        taxPrice:{
            type:Number,
            default:0,
            reqiured:true

        },
        shippingPrice:{
            type:Number,
            default:0,
            reqiured:true

        },
        totalPrice:{
            type:Number,
            default:0,
            reqiured:true

        }
    },
    orderStatus:{
        type:String,
        reqiured:true,
        default:"Processing"
    },
    createdAt:{
        type:Date,
        deafult:Date.now()
    },
    deliverdAt:Date
})

module.exports=mongoose.model("Order",orderSchema)