import { configureStore } from "@reduxjs/toolkit";
import commentsSlice from "../features/comments/commentsSlice";
import newsSlice from "../features/news/newsSlice";

export const store = configureStore({
  reducer: {
    news: newsSlice,
    comments: commentsSlice,
  },
});
