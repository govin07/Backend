const mongoose = require('mongoose');


mongoose.connect("mongodb://localhost:27017/apidev-demo")
.then(()=>{
    console.log("DB is connected")
})
.catch(()=>{
    console.log("db is not connected")
})


// schema

const UserSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    age:{
        type:Number,
        max: [100, "chl be itna kon jita he "],
        min: [20, "goli beta masti nhi "],
    },
    email:String,
})

// model  
const userModel = mongoose.model("users", UserSchema)

// inserting data

// let user = {
//     name:"saching",
//     age:15,
//     email: "govindrajput02653@gmail.com"
// }

// userModel.create(user)
// .then((res)=>{
//     console.log("data inserted")

// })
// .catch((err)=>{
//     console.log("data is not inserted");
//     throw err

// })

userModel.find({name:"sachin"})
.then((data)=>{
    console.log(data)
    
})
.catch((err)=>{
    console.log(err)

})