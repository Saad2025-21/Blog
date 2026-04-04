import express from "express"
import { login, register, logout, updateProfile, getAlluser } from "../controllers/user.contoller.js"
import { isAuthenticated } from "../middleware/isAuthenticated.js"
import { singleupload } from "../middleware/multer.js"

const router = express.Router()

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/profile/update").put(isAuthenticated, singleupload, updateProfile)
router.get('/all-users', getAlluser);

export default router;