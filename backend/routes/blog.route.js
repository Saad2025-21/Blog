import express from 'express'

import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { singleupload } from "../middleware/multer.js";
import { createblog, updateblog, getallblog, getpublishedblog, getownblogs, gettotallikes, likes, deleteblog, dislikeBlog, togglepublishedblog } from "../controllers/blog.controller.js";

const router = express.Router()

router.route('/').get(isAuthenticated, createblog)

router.route('/:blogId').put(isAuthenticated, singleupload, updateblog)
router.route('/:blogId').patch(togglepublishedblog)

router.route('/get-all-blogs').get(getallblog)
router.route('/getpublished-blog').get(getpublishedblog)
router.route('/get-own-blogs').get(isAuthenticated, getownblogs)

router.route('/:blogId/delete-blog').delete(isAuthenticated, deleteblog)

router.get('/:id/likes', isAuthenticated, likes)
router.get('/:id/dislike', isAuthenticated, dislikeBlog)
router.get('/my-blogs/likes', isAuthenticated, gettotallikes)

export default router