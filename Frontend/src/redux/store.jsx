import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./Slice";
const Store = configureStore({
  reducer: {
    user: UserSlice,
  },
});
export default Store;
