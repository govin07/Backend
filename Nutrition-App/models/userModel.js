const mongoose = require('mongoose')

let userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true, "Name is medetory"]
    },
    Email:{
        type:String,
        required:[true, "Email is medetory"]
    },
    Password:{
        type:String,
        required:[true, "Password is medentory"]
    },
    age:{
        type:Number,
        required:[true, "Age is medetory"],
        min:12,
        max:100,
    }
}, {timestamps:true})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel;