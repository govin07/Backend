const mongoose = require('mongoose');


mongoose.connect("mongodb://localhost:27017/apidev-demo")
.then(()=>{
    console.log("DB is connected")
})
.catch(()=>{
    console.log("db is not connected")
})


// schema