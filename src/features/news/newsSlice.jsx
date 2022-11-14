import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../helpers/api";

const initialState = {
  news: [],
  currentNews: [],
};

export const getNews = createAsyncThunk("news/getNews", async () => {
  const { data } = await api.get("newstories.json");

  const url = await data.slice(0, 100).map((id) => api.get(`item/${id}.json`));

  return (await Promise.all(url)).map(({ data }) => data);
});

export const getCurrentNews = createAsyncThunk(
  "news/getCurrentNews",
  async (id) => {
    const { data } = await api.get(`item/${id}.json`);

    return data;
  }
);

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNews.fulfilled, (state, action) => {
      state.news = action.payload;
    });
    builder.addCase(getCurrentNews.fulfilled, (state, action) => {
      state.currentNews = action.payload;
    });
  },
});

export const selectNews = (state) => state.news.news;

export default newsSlice.reducer;
