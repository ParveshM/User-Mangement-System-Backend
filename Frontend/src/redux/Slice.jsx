import { createSlice } from "@reduxjs/toolkit";
const storedUser = JSON.parse(localStorage.getItem("user"));

const UserSlice = createSlice({
  name: "user",
  initialState: {
    name: storedUser?.name || null,
    id: null,
    isAuthenticated: storedUser?.isAuthenticated || null,
    isAdmin: storedUser?.isAdmin || null,
  },
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.id = action.payload.id;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.isAdmin = action.payload.isAdmin;

      const userData = {
        name: action.payload.name,
        id: action.payload.id,
        isAuthenticated: action.payload.isAuthenticated,
        isAdmin: action.payload.isAdmin,
      };

      localStorage.setItem("user", JSON.stringify(userData));
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
