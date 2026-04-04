import mongoose from "mongoose"
import User from './user.model.js';

const blogschema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    subtitle: {
        type: String
    },
    description: {
        type: String
    },
    thumbnail: {
        type: String
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    category: {
        type: String
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    }],
    isPublshed: {
        type: Boolean,
        default: false
    },


}, { timestamps: true })

const blog = mongoose.model("blog", blogschema)
export default blog