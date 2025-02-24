import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    getFeed: (state, action) => {
      return action.payload;
    },
    removeUserFromFeed: (state, action) => {
      console.log("Hitted");
      const newFeed = state.filter((user) => user._id !== action.payload);
      return newFeed;
    },
    removeFeed: (state, action) => {
      return null;
    },
  },
});

export const { getFeed, removeUserFromFeed, removeFeed } = feedSlice.actions;
export default feedSlice.reducer;
