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
    toggleForm: (state, action) => {
      const form = action.payload;
      const isNotifications = form === "notifications";
      const isGroups = form === "groups";
      const isFriends = form === "friends";
      // Toggle logic
      state.showNotificationsForm = isNotifications
        ? !state.showNotificationsForm
        : false;

      state.showGroupsForm = isGroups ? !state.showGroupsForm : false;

      state.showFriendsForm = isFriends ? !state.showFriendsForm : false;
    },

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
  toggleForm,
} = publicSlice.actions;
export default publicSlice.reducer;
