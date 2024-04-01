require('dotenv').config()
const express = require('express')
const mongoose=require('mongoose')
const workoutsroutes=require('./routes/workouts')
const userRoutes=require('./routes/user')


// express app

const app=express()

app.use((req,res,next)=>{
console.log(req.path,req.method);
next()
})

app.use(express.json())

//routes
app.use('/',(req,res,next)=>{
    res.json({message:"hello"})
    next()
  })
app.use('/api/workouts/',workoutsroutes)
app.use('/api/user/',userRoutes)



mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(4000,()=>{
        console.log("DB connected & running on PORT",4000);
    })

})
.catch((error)=>{
    console.log(error);
})

