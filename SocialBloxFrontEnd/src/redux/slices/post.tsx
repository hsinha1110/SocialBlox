import { createSlice } from '@reduxjs/toolkit';
import {
  deletePostByIdThunk,
  getPostThunk,
} from '../asyncThunk/auth.asyncThunk';

interface PostState {
  posts: any[];
  loading: boolean;
  error: string | null;
}

const initialState: PostState = {
  posts: [],
  loading: false,
  error: null,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder
      .addCase(getPostThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPostThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload?.posts || action.payload?.data || []; // fallback
      })
      .addCase(getPostThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Failed to load posts';
      });
    builder
      .addCase(deletePostByIdThunk.pending, state => {
        state.loading = true;
      })
      .addCase(deletePostByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        const deletedId = action.payload.postId;

        // Remove post from state
        state.posts = state.posts.filter(post => post._id !== deletedId);
      })
      .addCase(deletePostByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default postSlice.reducer;
