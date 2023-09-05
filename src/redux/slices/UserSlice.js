import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    token: '',
    role : ''
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true
      state.token = action.payload.token
      state.role = action.payload.role
    },
    logout: (state) => {
      state.isLoggedIn = false
      state.token = ''
      state.role = ''
    }
  }
});

export const { login, logout } = UserSlice.actions;
export default UserSlice.reducer;
