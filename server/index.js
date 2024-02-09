import express from "express"
import mongoose from "mongoose"
import bodyParser from 'body-parser';
import auth from "./Api/routes/auth.js"
import existingAuth from "./Api/routes/existingAuth.js"
import task from "./Api/routes/task.js"

mongoose.connect("mongodb+srv://shanvig819:Palak@cluster0.rg4ioyz.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    console.log("mongodb is connected")
}).catch(err=>console.log("something wrong"))

const app=express()
app.listen(3000,()=>console.log("i am reached the location"))
app.use(bodyParser.json());

app.get("/",(req,res)=>res.json("hello "))
app.use('/auth',auth)
app.use("/existingAuth",existingAuth)
app.use("/task",task)
