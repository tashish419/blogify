import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {
    setBlogs: (state, action) => {
      state.posts = action.payload;
    },
    addBlog: (state, action) => {
      state.posts.push(action.payload);
    },
    updateBlog: (state, action) => {
      const index = state.posts.findIndex((b) => b.id === action.payload.id);
      if (index !== -1) state.posts[index] = action.payload;
    },
    deleteBlog: (state, action) => {
      state.posts = state.posts.filter((b) => b.id !== action.payload);
    },

  },
});

export const { setBlogs, addBlog, updateBlog, deleteBlog } = blogSlice.actions;

export default blogSlice.reducer;