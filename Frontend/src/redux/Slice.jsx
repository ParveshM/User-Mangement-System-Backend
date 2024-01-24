import { createSlice } from "@reduxjs/toolkit";
const storedUser = localStorage.getItem("user");
const UserSlice = createSlice({
  name: "user",
  initialState: {
    name: storedUser || null,
    id: null,
    isAuthenticated: false,
    role: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.id = action.payload.id;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.role = action.payload.role;
      localStorage.setItem("user", action.payload.name);
    },
    setTokens: (state, action) => {
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
    },
    clearTokens: () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
    clearUser: (state) => {
      state.name = null;
      state.id = null;
      state.isAuthenticated = null;
      state.role = null;
      localStorage.removeItem("user");
    },
  },
});
export const { setUser, clearUser, setTokens, clearTokens } = UserSlice.actions;
export default UserSlice.reducer;
