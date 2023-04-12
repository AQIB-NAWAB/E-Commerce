const app=require("./app")
const dotenv=require("dotenv")
const connectDatabase=require("./config/Database")
//hadnling the uncaught Exception
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`)
    console.log(`Shutting Down the error due to Uncaught`)
    process.exit(1)

})
//  Config
dotenv.config({path:"./config/.env"})
// conecting to database
connectDatabase()
const server= app.listen(process.env.PORT,()=>{
    console.log(`Server is listening on port http://localhost:${process.env.PORT}` )
})


process.on("unhandledRejection",err=>{
    console.log(`Error:${err.message}`)
    console.log("Shutting down the server due to Unhandeled")
    server.close(()=>{
        process.exit(1)
    })
})