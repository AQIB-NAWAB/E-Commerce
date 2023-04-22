const express=require("express")
const errorHandler=require("./middleware/error")
const cookieParser = require('cookie-parser');
const cors=require("cors")
const bodyParser=require("body-parser")
const filesUpload=require("express-fileupload")
const cloudinary=require("cloudinary")
const app=express()
app.use(express.json())
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}))
app.use(filesUpload())
app.use(cors({
    origin: 'http://localhost:5173', // Replace with the URL of your front-end application
    credentials: true // Enable cookies and other credentials in cross-origin requests
  }));
  cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_keys:process.env.CLOUDINARY_API_KEYS,
    api_secret:process.env.CLOUDINARY_API_SECRET
})
// Middlware for Errors
// Route Imports


const product=require("./routes/productRoute")
const user=require("./routes/userRoute")
const order=require("./routes/orderRoutes");
const fileUpload = require("express-fileupload");
app.use("/api/v1/",product)
app.use("/api/v1/",user)
app.use("/api/v1/",order)


app.use(errorHandler)

module.exports=app