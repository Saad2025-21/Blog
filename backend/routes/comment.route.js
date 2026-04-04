import express from "express"

import { isAuthenticated } from "../middleware/isAuthenticated.js"
import { createcomment, deletecomment, editcomment, getallcommentsonMyblog, getcommentsofPost, likecomment } from "../controllers/comment.controller.js";

const router = express.Router()

router.post('/:id/create', isAuthenticated, createcomment);
router.delete("/:id/delete", isAuthenticated, deletecomment);
router.put("/:id/edit", isAuthenticated, editcomment);
router.route("/:id/comment/all").get(getcommentsofPost);
router.get('/:id/like', isAuthenticated, likecomment);
router.get('/my-blogs/comments', isAuthenticated, getallcommentsonMyblog)


export default router;