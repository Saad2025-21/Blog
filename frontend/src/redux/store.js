import { configureStore } from "@reduxjs/toolkit"
import authslice from "./authslice"
import themeslice from "./themeslice"
import blogSlice from "../redux/blogSlice"

const store = configureStore({
    reducer: {
        auth: authslice,
        theme: themeslice,
        blog: blogSlice,
    }
})

export default store