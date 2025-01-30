const mongoose = require("mongoose");

const TrackingSchema = mongoose.Schema({
    userId:{
         type:mongoose.Schema.Types.ObjectId ,
         ref:'users',
         required:true
    },
    foodId:{
        type:mongoose.Schema.Types.ObjectId ,
        ref:'foods',
        required:true
    },
    quantity:{
        type:Number,
        main:1,
        required:true
    }
},{timestamps:true})


const trackingModel = mongoose.model('tracking',TrackingSchema);

module.exports = trackingModel;