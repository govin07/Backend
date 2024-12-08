import mongoose, {Scheme} from 'mongoose';

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
        requiered: [true , "password is required"]
    }
});

export const User = mongoose.model("User", UserSchema);