import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RegisterThunk } from '../asyncThunk/auth.asyncThunk';
import { RegisterResponse } from '../../types/types';
import { THUNK_STATUS } from '../constants';
import type { RootState } from '../store';

// ----------------------
// State Types
// ----------------------

interface AuthState {
  user: RegisterResponse | null;
  accessToken: string | null;
  authStatus: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isError: boolean;
}

// ----------------------
// Initial State
// ----------------------

const initialState: AuthState = {
  user: null,
  accessToken: null,
  authStatus: null,
  isLoading: false,
  isAuthenticated: false,
  isError: false,
};

// ----------------------
// Slice
// ----------------------

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(RegisterThunk.pending, state => {
        state.authStatus = THUNK_STATUS.LOADING;
        state.isLoading = true;
        state.isError = false;
      })

      .addCase(
        RegisterThunk.fulfilled,
        (state, action: PayloadAction<RegisterResponse>) => {
          state.authStatus = THUNK_STATUS.SUCCESS;
          state.isLoading = false;
          state.isError = false;

          state.user = action.payload;
          state.accessToken = action.payload.data.accessToken;
          state.isAuthenticated = true;
        },
      )

      .addCase(RegisterThunk.rejected, state => {
        state.authStatus = THUNK_STATUS.FAILED;
        state.isLoading = false;
        state.isError = true;
        state.isAuthenticated = false;
      });
  },
});

// ----------------------
// Exports
// ----------------------

export const { logout } = authSlice.actions;

export const authStatusSelector = (state: RootState) => state.auth;

export default authSlice.reducer;
