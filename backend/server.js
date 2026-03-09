import express from "express"
import dotenv from "dotenv"
import connectDB from "./src/config/database.js"
import authRouter from "./src/routes/user.route.js"
import cookieParser from "cookie-parser"

dotenv.config()
const app=express()

const PORT=process.env.PORT || 5000

app.get("/",(req,res)=>{
    res.send("Hello World")
})

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}));
app.use("/api/v1",authRouter)

app.listen(PORT,()=>{
    connectDB()
    console.log(`Server is running on port ${PORT}`)
})