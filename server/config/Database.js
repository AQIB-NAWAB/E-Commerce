const mongoose=require("mongoose")


const connectDatabase=()=>{
    mongoose.connect(process.env.URI).then(()=>{
        console.log("DB Connected")
    })
}

module.exports=connectDatabase