const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/DB-01")
   .then(()=>{
    console.log("database is connected")
})
.catch(()=>{
    console.log("database is not connected")
})
// schema for product 

// authentication 

const usersSchema = mongoose.Schema({
    name:{
      type: String,
      required:  [true, "Name is mendetary"]  
    },
    Email:{
        type:String,
        required:[true, "Email is Mendatary"]
    },
    Password:{
        type:String,
        required: [true, "Password is mendetary"]
    }
}, {timestamps:true})



const usersModel = mongoose.model("users",usersSchema)

app.post("/register", (req, res)=>{
    let user = req.body

    bcrypt.genSalt(8, (err, salt)=>{
        if(!err){
          bcrypt.hash(user.Password,salt,(err, hpass)=>{
            if(!err){
                user.Password = hpass; 
                usersModel.create(user)
                .then(()=>{
                    res.send("data is inserted")
                })
                .catch((err)=>{
                    console.log("data is not inserted",err)
                })
            }
          })
             
        }
    
    } )
   
    // res.send("post is working")

})

// endpoint for login 

app.post("/login", (req,res)=>{
    let userCred = req.body;
    usersModel.findOne({Email:userCred.Email})
    .then((user)=>{
        if(user!==null){
           bcrypt.compare(userCred.Password, user.Password, (err,result)=>{
            if(result==true){
                // res.send({message:"login success"});
                // generate a token and send it back
                jwt.sign({Email:userCred.Email}, "govind",(err,token)=>{
                    if(!err){
                        res.send({token:token})
                    }else{
                        console.log({message:"token is not created"},err)
                    }
                })
            }else{
                res.send({message:"password is incorrect"})
            }

           })
        }else{
            console.log(user)
            res.send({message:"user with this email doesnt exist"})
        }
       

    })
    .catch((err)=>{
        console.log(err);
        res.send({message:"some Problem"})

    })
    // res.send("login is working")
})



app.get("/getdata", verifyToken, (req,res)=>{
    res.send({message:"i am a bad developer with good heart "})
})

function verifyToken(req, res,next){
    let tokens = req.headers.authorization.split(" ")[1];
    jwt.verify(tokens, "govind",(err, decoded)=>{
        if(!err){
            console.log(decoded)
            next()
        }
        else{
            res.send({message:"token is incorrect"})
        }
    })
    // res.send("coming from middleware")
    // next()

}



app.listen(8000 ,()=>{
    console.log("server is up and running on port")
})