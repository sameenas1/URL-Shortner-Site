import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import urlReducer from "./urlSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    urls: urlReducer,
  },
});
