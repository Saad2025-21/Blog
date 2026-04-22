import { configureStore } from "@reduxjs/toolkit"
import authslice from "./authslice"
import themeslice from "./themeslice"
import blogSlice from "../redux/blogSlice"
import commentSlice from "../redux/commentSlice"

const store = configureStore({
    reducer: {
        auth: authslice,
        theme: themeslice,
        blog: blogSlice,
        comment: commentSlice,
    }
})

export default store