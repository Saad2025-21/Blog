import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import getDataUri from "../utils/dataUri.js"
import cloudinary from "../utils/cloudinary.js"

export const register = async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body
        if (!firstname || !lastname || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const regexemail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!regexemail.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email"
            })
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password should at least be 6 charaters long "
            })
        }

        const existinguser = await User.findOne({ email: email })
        if (existinguser) {
            return res.status(400).json({
                success: false,
                message: "User already registered"
            })
        }

        const hashedpass = await bcrypt.hash(password, 10)

        await User.create({
            firstname,
            lastname,
            email,
            password: hashedpass
        })

        return res.status(201).json({
            success: true,
            message: "User created successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success: false,
            message: "Failed to register"
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email && !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        let user = await User.findOne({ email: email })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            })
        }

        const validpass = await bcrypt.compare(password, user.password)
        if (!validpass) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            })
        }
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' })
        return res.status(201).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: "strict" }).json({
            success: true,
            message: `Welcome Back! ${user.firstname}`,
            user
        })

    }
    catch (error) {
        console.log(error)
        return res.status(400).json({
            success: false,
            message: "Failed to login"
        })
    }
}

export const logout = async (_, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "User logout sucessfully ",
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}

export const updateProfile = async (req, res) => {
    try {
        const userId = req.id
        const { firstname, lastname, email, password, bio, occupation } = req.body
        const file = req.file
        let cloudresponse 
        
        if (file) {
            const fileuri = getDataUri(file)
            await cloudinary.uploader.upload(fileuri)
        }

        const user = await User.findById(userId).select(-password)
        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false
            })
        }

        if (firstname) user.firstname = firstname
        if (lastname) user.lastname = lastname
        if (email) user.email = email
        if (bio) user.bio = bio
        if (occupation) user.occupation = occupation
        if (file && cloudresponse) user.photoUrl = cloudresponse.secure_url



        await user.save()
        return res.status(200).json({
            message: "profile updated successfully",
            success: true,
            user
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to update profile"
        })
    }
}

export const getAlluser = async (_, res) => {
    try {
        const users = await User.find().select('-password')
        res.status(200).json({
            success: true,
            message: "User list fetched successfully",
            total: users.length,
            users
        });
    } catch (error) {
        console.error("Error fetching user list:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch users"
        });
    }
}
