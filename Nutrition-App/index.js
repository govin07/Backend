const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); 
const userModel = require("./models/userModel")
const foodModel = require('./models/foodModel')
const verifyToken = require('./verifyToken')




mongoose.connect("mongodb://localhost:27017/nutrify")
.then(()=>{
    console.log("database is connected")
})
.catch((err)=>{
    console.log("connection failed", err)

})



const app = express();
app.use(express.json())


// this is endpoint for registering users
app.post("/register", (req,res)=>{
    let user = req.body;
    const saltRounds = 10;
   
       bcrypt.hash(user.Password, saltRounds, async (err, hpass) => {
        if (!err) {
            user.Password = hpass;
            try {
                let doc = await userModel.create(user);
                res.status(201).send({ message: "user is registered" });
            } catch (err) {
                console.log(err);
                res.status(500).send({ message: "some problem in registration" });
            }
        } else {
            res.status(500).send({ message: "Error hashing password" });
        }
    });
   
});

// this is endpoint for login user
app.post("/login",async(req,res)=>{
    let usercred = req.body;
   
    try{
        const user = await userModel.findOne({Email:usercred.Email})
        
        if(user!== null){
            bcrypt.compare(usercred.Password,user.Password,(err, success)=>{
                if(success == true){
                   jwt.sign({Email:usercred.Email},"nutrifyapp",(err,token)=>{
                    if(!err){
                        res.send({message:"Login is success", token:token})
                    }
                   })
                }
                else{
                    res.status(403).send({message:"Incorrect password"})
                }
            })


        }else{
            res.status(404).send({message:"user is not found"})
        }
    }catch(err){
        console.log(err);
        res.status(500).send({message:"some problem in login"})

    }


})
 
// endpoint to see all foods
app.get("/foods", verifyToken, async (req,res)=>{
    try{
        let foods = await foodModel.find()
        res.send(foods)
    }catch(err){
        console.log(err);
        res.status(500).send({message:"something wrong in getting foods"})

    }
});
 
// endpoint search food by name

app.get("/foods/:name",  async (req,res)=>{
    try{
   let foods = await foodModel.find({name:{$regex:req.params.name, $options:'i'}})
   if(foods.length!==0){
    res.send(foods)
   }
   else{
    res.status(404).send({message:"food items not found "})
   }
  

    }catch(err){
        console.log(err)
        res.status(500).send({message:"some problem in searching food "})

    }
})



app.listen(8000, ()=>{
    console.log("app is running on 8000 port")
    
})