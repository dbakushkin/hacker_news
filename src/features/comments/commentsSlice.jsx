import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../helpers/api";

const initialState = {
  comments: [],
  childComments: [],
  subChildComments: [],
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

export const getChildComments = createAsyncThunk(
  "comments/getChildComments",
  async (kids) => {
    const url = kids.map((id) => api.get(`item/${id}.json`));
    const result = (await Promise.all(url)).map(({ data }) => data);
    return { result };
  }
);

export const getSubChildComments = createAsyncThunk(
  "comments/getSubChildComments",
  async (kids) => {
    const url = kids.map((id) => api.get(`item/${id}.json`));
    const result = (await Promise.all(url)).map(({ data }) => data);
    console.log(result);
    return { result };
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
    builder.addCase(getChildComments.fulfilled, (state, action) => {
      state.childComments = action.payload.result;
    });
    builder.addCase(getSubChildComments.fulfilled, (state, action) => {
      state.subChildComments = action.payload.result;
    });
  },
});

export const selectComments = (state) => state.comments.comments;

export default commentSlice.reducer;
