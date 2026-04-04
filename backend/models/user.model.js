import mongoose from "mongoose"

const usershema = new mongoose.Schema({
    firstname: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
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