// src/store/publicSlice.js
import { createSlice } from "@reduxjs/toolkit";

const publicSlice = createSlice({
  name: "public",
  initialState: {
    showNotificationsForm: false,
    showGroupsForm: false,
    showFriendsForm: false,
  },
  reducers: {
    setShowNotificationsForm: (state, action) => {
      state.showNotificationsForm = action.payload;
    },
    setShowGroupsForm: (state, action) => {
      state.showGroupsForm = action.payload;
    },
    setShowFriendsForm: (state, action) => {
      state.showFriendsForm = action.payload;
    },
  },
});

export const {
  setShowNotificationsForm,
  setShowGroupsForm,
  setShowFriendsForm,
} = publicSlice.actions;
export default publicSlice.reducer;
