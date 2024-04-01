const Workout= require('../models/WorkoutModel')
const mongoose = require('mongoose')


// get all workouts

const getWorkouts = async(req,res)=>{
    const user_id = res.user._id
    
    const workouts = await Workout.find({user_id}).sort({createdAt:-1})

    res.status(200).json(workouts)

}
//get one workout
const getWorkout =async (req,res)=>{
    const {id}= req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
       return res.status(404).json({error : 'no such workout'})
    }

    const workout = await Workout.findById(id)

    if(!workout){
        return res.status(400).json({error : 'no such workout'})
    }

    

    res.status(200).json(workout)
}

// create a workouts
const createWorkout=async(req,res)=>{
    const {title,reps,load} = req.body
    const userid = res.user._id
    console.log(userid);
    let emptyField = []

    if(!title){
        emptyField.push('title')
    }
    if(!reps){
        emptyField.push('reps')
    }
    if(!load){
        emptyField.push('load')
    }
    if(emptyField.length >0){
        return res.status(400).json({error :'please fill in the all fields',emptyField})
    }
    
// doc to DB
    try{
        const user_id = res.user._id
        const workout =await Workout.create({title,reps,load,user_id})
        res.status(200).json({workout})
        
        
    }catch(error){
        res.status(400).json({error:error.message})
    }

}


// delete a workout 
const deleteWorkout =async (req,res)=>{
    const {id}= req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
       return res.status(404).json({error : 'no such workout'})
    }

    const workout = await Workout.findByIdAndDelete({_id : id})

    if(!workout){
        return res.status(400).json({error : 'no such workout'})
    }

    

    res.status(200).json(workout)
}


// update a workout
const updateWorkout =async (req,res)=>{
    const {id}= req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
       return res.status(404).json({error : 'no such workout'})
    }

    const workout = await Workout.findByIdAndUpdate({_id : id},{
        ...req.body
    })

    if(!workout){
        return res.status(400).json({error : 'no such workout'})
    }

    

    res.status(200).json(workout)
}



module.exports = {
    createWorkout,
    getWorkout,
    getWorkouts,
    deleteWorkout,
    updateWorkout
}