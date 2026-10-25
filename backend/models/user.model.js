import mongoose from "mongoose"

const usershema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique:true,
        lowercase:true,
        trim:true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default:""
    },
    occupation: {
        type: String
    },
    photoUrl:{
        type:String
    },

}, { timestamps: true })

const User = mongoose.model("User",usershema)
export default User