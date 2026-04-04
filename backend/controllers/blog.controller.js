
import  blog  from "../models/blog.model.js";
import comment from "../models/comment.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/dataUri.js";

export const createblog = async (req, res) => {
    try {
        const { title, category } = req.body
        if (!title || !category) {
            return res.status(400).json({
                message: "Title and Category is required ",
                success: false
            })
        }

        const Blog = await blog.create({
            title,
            category,
            author: req.id
        })

        return res.status(201).json({
            message: "Blog created successfully",
            success: true,
            Blog
        })



    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to create blog"
        })

    }
}

export const updateblog = async (req, res) => {
    try {
        const blogId = req.params.blogId
        const { title, subtitle, description, category } = req.body;
        const file = req.file;

        let Blog = await blog.findById(blogId).populate("author");
        if (!Blog) {
            return res.status(404).json({
                message: "Blog not found!"
            })
        }

        let thumbnail;
        if (file) {
            const fileuri = getDataUri(file)
            thumbnail = await cloudinary.uploader.upload(fileuri)
        }

        const updatedata = { title, subtitle, description, category, author: req.id, thumbnail: thumbnail?.secure_url }
        Blog = await blog.findByIdAndUpdate(blogId, updatedata, { new: true })

        return res.status(201).json({ message: "Blog updated successfully", success: true, Blog })
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating blog", error: error.message });
    }
}

export const getallblog = async (_, res) => {
    try {
        const blogs = await blog.find().sort({ createdAt: -1 }).populate({
            path: 'author',
            select: 'firstname lastname photoUrl'
        }).populate({
            path: 'comments',
            sort: { createdAt: -1 },
            populate: {
                path: 'userId',
                select: 'firstname lastname photoUrl'
            }
        })
        res.status(200).json({ success: true, blogs });

    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching blogs", error: error.message });
    }
}

export const getpublishedblog = async (_, res) => {
    try {
        const blogs = await blog.find({ isPublshed: true }).sort({ createdAt: -1 }).populate({
            path: 'author',
            select: 'firstname lastname photoUrl'
        }).populate({
            path: 'comments',
            sort: { createdAt: -1 },
            populate: {
                path: 'userId',
                select: 'firstname lastname photoUrl'
            }
        })

        if (!blogs) {
            return res.status(404).json({
                message: "Blog not found"
            })
        }
        return res.status(200).json({
            success: true,
            blogs,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to get published blogs"
        })
    }
}

export const togglepublishedblog = async (_, res) => {
    try {
        const { blogId } = req.params

        const blog = await blog.findById(blogId)
        if (!blog) {
            return res.status(404).json({
                message: "Blog not found!"
            });
        }
        blog.isPublshed = !blog.isPublshed
        await blog.save()
        const statusMessage = blog.isPublished ? "Published" : "Unpublished";
        return res.status(200).json({
            success: true,
            message: `Blog is ${statusMessage}`
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to update status"
        })
    }
}

export const getownblogs = async (req, res) => {
    try {
        const { userId } = req.params

        if (!userId) {
            return res.status(400).json({ message: "User ID is required." });
        }

        const blogs = await blog.find({ author: userId }).populate({
            path: 'author',
            select: 'firstname lastname photoUrl'
        }).populate({
            path: 'comment',
            sort: {
                createdAt: -1
            },
            populate: {
                path: 'userId',
                select: 'firstname lastname photoUrl'
            }
        })

        if (!blogs) {
            return res.status(404).json({ message: "No blogs found.", blogs: [], success: false });
        }

        return res.status(200).json({ blogs, success: true });



    } catch (error) {
        return res.status(500).json({ message: "Error fetching blogs", error: error.message });
    }
}

export const deleteblog = async (req, res) => {
    try {
        const blogId = req.params.blogId
        const authorId = req.id
        const Blog = await blog.findById(blogId)

        console.log(blogId)
        if (!Blog) {
            return res.status(400).json({ message: 'Blog not found', success: false })
        }
        if (Blog.author.toString() !== authorId) {
            return res.status(403).json({ success: false, message: 'Unauthorized to delete this blog' });
        }
        await blog.findByIdAndDelete(blogId)

        await comment.deleteMany({ postId: blogId })

        res.status(200).json({ success: true, message: "Blog deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Error deleting blog", error: error.message });
    }
}

export const likes = async (req, res) => {
    try {
        const blogId = req.params.id
        const userId_like = req.id
        const blog = await blog.findById(blogId).populate({ path: 'likes' })

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found', success: false })
        }

        await blog.updateOne({ $addtoset: { likes: userId_like } })
        await blog.save()

        return res.status(200).json({ message: 'Blog liked', blog, success: true });
    } catch (error) {
        console.log(error);

    }
}

export const dislikeBlog = async (req, res) => {
    try {
        const likeKrneWalaUserKiId = req.id;
        const blogId = req.params.id;
        const blog = await Blog.findById(blogId);
        if (!blog) return res.status(404).json({ message: 'post not found', success: false })


        await blog.updateOne({ $pull: { likes: likeKrneWalaUserKiId } });
        await blog.save();

        return res.status(200).json({ message: 'Blog disliked', blog, success: true });
    } catch (error) {
        console.log(error);

    }
}

export const gettotallikes = async (req, res) => {
    try {
        const userId = req.id

        const myblog = await blog.find({ author: userId }).select('likes')

        const totallikes = myblog.reduce((acc, blog) => acc + (blog.likes?.length || 0), 0)

        return res.status(201).json({
            success: true,
            totalblog: myblog.length,
            totallikes
        })
    } catch (error) {
        console.error("Error getting total blog likes:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch total blog likes",
        });
    }
}