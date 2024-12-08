import mongoose from "mongoose";
import { DB_Name } from "../constants.js";



 const connetDB = async () => {
    try{
       const connectionInstance =  await mongoose.connect(`${process.env.MONGODB_URI}/${DB_Name}`)
       console.log(`\n mongodb conneted  !! Db host ${connectionInstance.connection.host}`)

    }
    catch(err){
        console.log(" mongoDb connection ERROR: ");
        process.exit(1)

    }
}

export default connetDB;