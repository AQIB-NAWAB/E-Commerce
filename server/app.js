const express=require("express")
const errorHandler=require("./middleware/error")
const cookieParser = require('cookie-parser');
const cors=require("cors")
const app=express()
app.use(express.json())
app.use(cookieParser());
app.use(cors())
// Middlware for Errors
// Route Imports


const product=require("./routes/productRoute")
const user=require("./routes/userRoute")
const order=require("./routes/orderRoutes")
app.use("/api/v1/",product)
app.use("/api/v1/",user)
app.use("/api/v1/",order)


app.use(errorHandler)

module.exports=app