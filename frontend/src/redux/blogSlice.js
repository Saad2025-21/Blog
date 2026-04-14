import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blog: [],
    yourblog: []
  },
  reducers: {
    setBlog: (state, action) => {
      state.blog = action.payload
    },
    setYourBlog: (state, action) => {
      state.yourblog = action.payload;
    },
  }}
)

export const {setBlog ,setYourBlog} = blogSlice.actions
export default blogSlice.reducer