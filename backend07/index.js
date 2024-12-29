const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/DB-01").then(()=>{
    console.log("database is connected")
})
.catch(()=>{
    console.log("database is not connected")
})
// schema for product 

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please Enter your name"],

    },
    price:{
        type:Number,
        required:[true, "price is mendetary"],
        min:1,
        max:50,
    },
    quantity:{
        type:Number,
        required:true,
        min: 1,
        max:100,
    },
    category:{
        type:String,
        enum: ["electronic", "clothing","Household"],
    },
}, {timestamps:true })


// model creation

const productModel = mongoose.model("products", productSchema)


// app.use(middleman);

app.get("/get",(req,res)=>{
    console.log("get is called by app")
    res.send("welcome users")
})
app.get("/govind/:id/:name", (req,res)=>{
    res.send(`id is ${req.params.id} and name is ${req.params.name}`)
    
    
})
app.get("/testing/:id", (req, res)=>{
   
        res.send({messenge:"Testing request"})
    
   

})
app.get("/products",(req,res)=>{
    res.send("All products")
})

app.get("/products/:id", (req,res)=>{
    res.send({message:"single product"})

})
app.post("/products", (req,res)=>{
    console.log(req.body)
    res.send("post method")

})

function middleman(req,res, next){
    if(req.params.id<10){
        res.send("your can't reach this site")
    }
    else{
        next()
    }


}

app.delete("/products/:id", (req, res)=>{
    console.log(req.params.id);
    res.send({messege: "Delete successfull"})

})

app.put("/products/",(req, res)=>{
    console.log(req.params.id)
    console.log(req.body)
    res.send({messenge:"put is working sucessfull"})

})
app.listen(8000, ()=>{
    console.log("server is running")
})