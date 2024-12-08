import mongoose, {Scheme} from 'mongoose';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const UserSchema = new Scheme({

    username : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        index: true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
    },
    fullname : {
        type : String,
        required : true,
        trim : true,
        index: true
    },
    avatar : {
        type : String, // cloudinary url,
        required : true, 
    },
    coverImage : {
        type : String, // cloudinary url
    },
    watchHistory : [
        {
            type : Scheme.Types.ObjectId,
            ref : "Video",
        }
    ],
    password: {
        type: String,
        requiered: [true , "password is required"],  
    },
    refreshToken: {
        type: String,
    }
});

UserSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next()
    this.password = bcrypt.hash(this.password, 10);
    next()
}),

UserSchema.methods.isPasswordCorrect = async function (password){
   return await bcrypt.compare(password, this.password)

},
UserSchema.methods.generatAccessToken = async function(){
   return jwt.sign({
        _id: this.id,
        email: this.email,
        username:this.username,
        fullname: this.fullname
    },

    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
)

},
UserSchema.methods.generatRefreshToken = async function(){
    return jwt.sign({
        _id: this.id,
       
    },

    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
)
    
}

export const User = mongoose.model("User", UserSchema);