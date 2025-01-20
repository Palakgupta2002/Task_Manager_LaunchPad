import express from "express"
import mongoose from "mongoose"
import bodyParser from 'body-parser'
import cors from "cors"
import auth from "./Api/routes/auth.js"
import existingAuth from "./Api/routes/existingAuth.js"
import task from "./Api/routes/task.js"
import userData from "./Api/routes/userGet.js"
import Admin from "./Api/routes/adminAuth.js"
import getAllUser from "./Api/routes/allUserGet.js"
import UserDelete from "./Api/routes/deleteUser.js"
import manager from "./Api/routes/Manager.js"
import project from "./Api/routes/Project.js"
import dotenv from "dotenv"
dotenv.config()



mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("mongodb is connected")
}).catch(err=>console.log("something wrong"))



const app=express()
app.listen(5000,()=>console.log("i am reached the location"))

app.use(bodyParser.json());

app.use(cors())

app.get("/",(req,res)=>res.json("hello "))

app.use('/auth',auth)

app.use("/login",existingAuth)

app.use("/task",task)

app.use("/user",userData)

app.use("/admin",Admin)

app.use('/allUser',getAllUser)

app.use('/deleteUser',UserDelete)


app.use('/ManagerData',manager)

app.use('/Project',project)
