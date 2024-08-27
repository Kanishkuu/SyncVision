// models/User.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String 
    },
    googleId: { 
        type: String 
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"], 
    },
    profilePic: {
        type: String,
        default: "",
    }
}, { timestamps: true }); 

const User = mongoose.model('User', UserSchema);
export default User;
