// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import publicReducer from "./publicSlice";

export const store = configureStore({
  reducer: {
    public: publicReducer,
  },
});
