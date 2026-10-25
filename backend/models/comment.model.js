import mongoose from "mongoose";
const commentschema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "blog",
      required:true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required:true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true },
);

const comment = mongoose.model("comment", commentschema);

export default comment;
