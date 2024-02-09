import express from "express"

const app=express()

app.listen(3000,()=>console.log("i am reached the location"))
app.get("/",(req,res)=>res.json("hello "))