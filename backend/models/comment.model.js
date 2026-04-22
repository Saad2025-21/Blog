import mongoose from "mongoose"
const commentschema = new mongoose.Schema({
    content: {
        type: String,
        require:true
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "blog"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
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