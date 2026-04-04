import mongoose from "mongoose"
import blog from './blog.model.js'
import User from './user.model.js';
const commentschema = new mongoose.Schema({
    content: {
        type: String,
        default: ""
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: blog
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    likes: {
        type: Array,
        default: []
    },
    numberoflikes: {
        type: Number,
        default: 0
    },
}, { timestamps: true })

const comment = mongoose.model("comment", commentschema)

export default comment;