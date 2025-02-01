import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
  },
  reducers: {
    loginUser(state, action) {
      state.user = action.payload;
    },
    logOutUser(state) {
      state.user = null;
    },
  },
});

export const { loginUser, logOutUser } = authSlice.actions;

export default authSlice.reducer;
