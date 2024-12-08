import dotenv from 'dotenv';
import mongoose  from 'mongoose';
// import { DB_Name } from './constants.js';
import connetDB from './db/index.js';
import express from 'express';

dotenv.config({
    path: './env'
})

connetDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log("working on port ", process.env.PORT)
    })
})
.catch((err)=>{
    console.log("mongoDb connection failed")
    
})



























// const app = express();

// ( async()=>{
//     try{
//        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_Name}`)
//        app.on("error",()=>{
//         console.log("ERROR: ", error);
//         throw error
//        })
//        app.listen(process.env.PORT, () => {
//         console.log(`app  is listening on port ${process.env.PORT }`)
//        })
//     }
//     catch(err){
//         console.error("ERROR: ", err);
//         throw err

//     }
// }) ()