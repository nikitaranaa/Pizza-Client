import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    token: ''
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true
      state.token = action.payload
    },
    logout: (state) => {
      state.isLoggedIn = false
      state.token = ''
    }
  }
});

export const { login, logout } = UserSlice.actions;
export default UserSlice.reducer;
