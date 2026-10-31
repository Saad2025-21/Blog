import comment from "../models/comment.model.js";
import blog from "../models/blog.model.js";

export const createcomment = async (req, res) => {
  try {
    const postId = req.params.id;
    const { content } = req.body;

    const blogs = await blog.findById(postId);
    if (!blogs) {
      return res
        .status(404)
        .json({ message: "Blog not found", success: false });
    }

    if (!content || !content.trim()) {
      return res.status(400).json({
        message: "Text is required",
        success: false,
      });
    }

    const Comment = await comment.create({
      content: content.trim(),
      userId: req.id,
      postId: postId,
    });

    const populatedcomment = await Comment.populate({
      path: "userId",
      select: "firstname lastname photoUrl",
    });

    blogs.comments.push(Comment._id);
    await blogs.save();

    return res.status(201).json({
      message: "Comment Added",
      comment: populatedcomment,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in commenting",
      error: error.message,
    });
  }
};

export const getcommentsofPost = async (req, res) => {
  try {
    const blogid = req.params.id;
    const Comments = await comment
      .find({ postId: blogid })
      .populate({ path: "userId", select: "firstname lastname photoUrl" })
      .sort({ createdAt: -1 });

    if (!Comments)
      return res
        .status(404)
        .json({ message: "No comments found for this blog", success: false });
    return res.status(200).json({
      success: true,
      Comments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching commnets",
      error: error.message,
    });
  }
};

export const deletecomment = async (req, res) => {
  try {
    const commentid = req.params.id;
    const authorId = req.id;
    const comments = await comment.findById(commentid);
    if (!comments) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    }
    if (comments.userId.toString() !== authorId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to delete this comment",
      });
    }

    await comment.findByIdAndDelete(commentid);

    const blogid = comments.postId;
    await blog.findByIdAndUpdate(blogid, {
      $pull: { comments: commentid },
    });

    res
      .status(200)
      .json({ success: true, message: "Comment deleted Successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting comment",
      error: error.message,
    });
  }
};

export const editcomment = async (req, res) => {
  try {
    const userId = req.id;
    const { content } = req.body;
    const commentid = req.params.id;
    const Comment = await comment.findById(commentid);

    if (!Comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    if (Comment.userId.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to edit this comment",
      });
    }

    Comment.content = content;
    Comment.editedAt = new Date();

    await Comment.save();

    res.status(200).json({
      success: true,
      message: "Comment updated successfully",
      Comment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Comment is not edited",
      error: error.message,
    });
  }
};

export const likecomment = async (req, res) => {
  try {
    const userId = req.id;
    const commentid = req.params.id;
    const Comment = await comment.findById(commentid);
    if (!Comment) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    }
    const alreadyliked = Comment.likes.some((id) => id.toString() === userId);

    if (alreadyliked) {
      // already like, dislike
      Comment.likes = Comment.likes.filter((id) => id.toString() !== userId);
    } else {
      //like
      Comment.likes.push(userId);
    }

    await Comment.save();

    const updatedComment = await Comment.populate({
      path: "userId",
      select: "firstname lastname photoUrl",
    });

    res.status(200).json({
      success: true,
      message: alreadyliked ? "Comment unliked" : "Comment liked",
      updatedComment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while liking the comment",
      error: error.message,
    });
  }
};

export const getallcommentsonMyblog = async (req, res) => {
  try {
    const userId = req.id;

    const myblogs = await blog.find({ author: userId }).select("_id");

    const blogid = myblogs.map((blog) => blog._id);

    if (blogid.length === 0) {
      return res.status(200).json({
        success: true,
        totalComments: 0,
        comments: [],
        message: "No blogs found for this user.",
      });
    }

    const comments = await comment
      .find({ postId: { $in: blogid } })
      .populate("userId", "firstname lastname email")
      .populate("postId", "title");

    res.status(200).json({
      success: true,
      totalComments: comments.length,
      comments,
    });
  } catch (error) {
    console.error("Error fetching comments on user's blogs:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get comments.",
    });
  }
};
