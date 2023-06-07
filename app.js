const express = require('express')
const app = express()
const studentRoute = require('./API/Route/Student')
const userRoute = require('./API/Route/User')

const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const { urlencoded } = require('body-parser')

mongoose.connect('mongodb+srv://vivek:admin@cluster0.hmpds7g.mongodb.net/?retryWrites=true&w=majority');

mongoose.connection.on('error',err=>{
    console.log('connection failed');
})

mongoose.connection.on('connected',connected=>{
    console.log('connected with database ...');
})

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use('/student',studentRoute)
app.use('/user',userRoute)

app.use((req,res,next)=>{
    res.status(404).json({
        error:"bad request data not found"
    })
})

module.exports = app;