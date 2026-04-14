import { createSlice } from "@reduxjs/toolkit";

const storedUser = localStorage.getItem("user")


const authslice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        user: storedUser ? JSON.parse(storedUser) : null,
        profile: null
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setUser: (state, action) => {
            state.user = action.payload
        },
        setProfile: (state, action) => {
            state.profile = action.payload
        },
    }
})

export const { setLoading, setUser, setProfile } = authslice.actions
export default authslice.reducer 