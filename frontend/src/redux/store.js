import { configureStore } from "@reduxjs/toolkit"
import authslice from "./authslice"
import themeslice from "./themeslice"

const store = configureStore({
    reducer: {
        auth: authslice,
        theme: themeslice
    }
})

export default store