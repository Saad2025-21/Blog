import express from 'express'

import dotenv from 'dotenv';

import connectDB from './database/db.js'

import cookieparser from 'cookie-parser';
import cors from 'cors'

import userroute from './routes/user.route.js';
import blogroute from './routes/blog.route.js';
import commentroute from './routes/comment.route.js'

import path from 'path'

dotenv.config()
const app = express()
const port = 3000

app.use(express.json())
app.use(cookieparser())
app.use(express.urlencoded({ extended: true }))

app.use(cors({
    origin:['https://blog-seven-gold-11.vercel.app','http://localhost:5173'],
    credentials: true
}))

const _dirname = path.resolve()

//apis
app.use("/api/v1/user", userroute)
app.use("/api/v1/blog", blogroute)
app.use("/api/v1/comment", commentroute)


app.use(express.static(path.join(_dirname, "/frontend/dist")))

// app.get("*", (_, res) => {
//     res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"))
// })

app.get('/', (_, res) => {
    res.send("hello")
})

app.listen(port, () => {
    console.log(`Server connected on port ${port}`)
    connectDB()
})