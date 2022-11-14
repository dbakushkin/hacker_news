import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../helpers/api";

const initialState = {
  comments: [],
  childComments: {},
};

export const getComments = createAsyncThunk(
  "comments/getComments",
  async (id) => {
    const { data } = await api.get(`item/${id}.json`);

    const commentsId = data.kids;
    if (commentsId === undefined) {
      return data;
    }

    const url = commentsId.map((id) => api.get(`item/${id}.json`));

    return (await Promise.all(url)).map(({ data }) => data);
  }
);

export const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getComments.fulfilled, (state, action) => {
      state.comments = action.payload;
    });
  },
});

export const selectComments = (state) => state.comments.comments;

export default commentSlice.reducer;
