import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../helpers/api";

const initialState = {
  news: [],
};

export const getNews = createAsyncThunk("news/getNews", async () => {
  const { data } = await api.get("newstories.json");
  console.log(data);
  const links = await data
    .slice(0, 100)
    .map((id) => api.get(`item/${id}.json`));
  console.log(links);
  return (await Promise.all(links)).map(({ data }) => data);
});

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNews.fulfilled, (state, action) => {
      state.news = action.payload;
    });
  },
});

export const selectNews = (state) => state.news.news;

export default newsSlice.reducer;
