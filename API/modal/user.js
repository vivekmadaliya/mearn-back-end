const mongoose = require('mongoose')

const userShema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    firstname:String,
    lastname:String,
    email:String,
    password:String,
    usertype:String
})

module.exports = mongoose.model('user',userShema)