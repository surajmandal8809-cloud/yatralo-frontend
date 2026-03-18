// src/slices/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null, // Store the authentication token here
  isAuthenticated: false,
  userInfo: null, // Optional: Store user info if needed
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.userInfo = null;

    },
  },
});

export const { setToken, logout, setUserInfo } = userSlice.actions;
export default userSlice.reducer;
