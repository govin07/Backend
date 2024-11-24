const mongoose = require('mongoose');


// connection to mongo server


mongoose.connect("mongodb://localhost:27017/apidev_demo").then(() =>{
    console.log("Connection Successfull");
})
.catch((err)=>{
    console.log(err)
})