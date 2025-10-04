import { createSlice } from "@reduxjs/toolkit";

const usersFromStorage = JSON.parse(localStorage.getItem("users")) || [];
const currentUserFromStorage = JSON.parse(localStorage.getItem("currentUser")) || null;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    users: usersFromStorage,
    user: currentUserFromStorage,
    isAuthenticated: !!currentUserFromStorage, 
  },
  reducers: {
    signup: (state, action) => {
      const exists = state.users.find((u) => u.email === action.payload.email);
      if (exists) return;

      const newUser = {
        id: Date.now().toString(),
        username: action.payload.username,
        email: action.payload.email,
        password: action.payload.password,
      };
      state.users.push(newUser);
      localStorage.setItem("users", JSON.stringify(state.users));
    },
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true; 
      localStorage.setItem("currentUser", JSON.stringify(state.user));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false; 
      localStorage.removeItem("currentUser");
    },
  },
});

export const { signup, login, logout } = authSlice.actions;
export default authSlice.reducer;
