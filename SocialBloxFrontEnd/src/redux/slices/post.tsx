import { createSlice } from '@reduxjs/toolkit';
import { getPostThunk } from '../asyncThunk/auth.asyncThunk';

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

        // IMPORTANT FIX — ALWAYS LOG THE RESPONSE FIRST
        console.log('GET POST RESPONSE:', action.payload);

        // FIXED: response structure
        state.posts = action.payload?.posts || action.payload?.data || []; // fallback
      })
      .addCase(getPostThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Failed to load posts';
      });
  },
});

export default postSlice.reducer;
