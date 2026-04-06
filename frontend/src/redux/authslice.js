import { createSlice } from "@reduxjs/toolkit";

const authslice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        user: null,
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