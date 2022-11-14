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

export const getChildComments = createAsyncThunk(
  "comments/getChildComments",
  async (kids, id) => {
    const result = [];
    const idChild = async (kids) => {
      for (let i = 0; i < kids.length; i++) {
        const { data } = await api.get(`item/${kids[i]}.json`);
        if (data.kids) {
          result.push(data);
          await idChild(data.kids);
        } else {
          result.push(data);
        }
      }
    };
    await idChild(kids);
    return { id: id, result };
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
      state.childComments[action.payload.id] = action.payload.result;
    });
  },
});

export const selectComments = (state) => state.comments.comments;

export default commentSlice.reducer;
