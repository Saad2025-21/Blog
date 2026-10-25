import mongoose from "mongoose"

const blogschema = new mongoose.Schema({
    title: {
        type: String,
        required: true
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
        ref: "User"
    },
    category: {
        type: String
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment"
    }],
    isPublished: {
        type: Boolean,
        default: false
    },


}, { timestamps: true })

const blog = mongoose.model("blog", blogschema)
export default blog