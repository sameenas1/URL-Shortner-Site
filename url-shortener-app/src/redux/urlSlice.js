import { createSlice } from "@reduxjs/toolkit";

const urlsFromStorage = JSON.parse(localStorage.getItem("urls")) || [];

const urlSlice = createSlice({
  name: "urls",
  initialState: {
    urls: urlsFromStorage, 
  },
  reducers: {
    addUrl: (state, action) => {
      const newUrl = {
        id: Date.now().toString(),
        ...action.payload,
      };
      state.urls.push(newUrl);
      localStorage.setItem("urls", JSON.stringify(state.urls));
    },
    editUrl: (state, action) => {
      const idx = state.urls.findIndex((u) => u.id === action.payload.id && u.userId === action.payload.userId);
      if (idx !== -1) {
        state.urls[idx].title = action.payload.title;
        state.urls[idx].originalUrl = action.payload.originalUrl;
        localStorage.setItem("urls", JSON.stringify(state.urls));
      }
    },
    deleteUrl: (state, action) => {
      state.urls = state.urls.filter((u) => !(u.id === action.payload.id && u.userId === action.payload.userId));
      localStorage.setItem("urls", JSON.stringify(state.urls));
    },
  },
});

export const { addUrl, editUrl, deleteUrl } = urlSlice.actions;
export default urlSlice.reducer;
