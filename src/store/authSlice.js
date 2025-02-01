import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isAuthenticated: false,
    },
    reducers: {
        loginUser(state, action) {
        state.user = action.payload;
        state.isAuthenticated = true;
        },
        logOutUser(state) {
        state.user = null;
        state.isAuthenticated = false;
        },
    },
})

export const { loginUser, logOutUser } = authSlice.actions;

export default authSlice.reducer;