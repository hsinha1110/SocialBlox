import { createAsyncThunk } from '@reduxjs/toolkit';
import { ASYNC_ROUTES, SERVICE_ROUTES } from '../constants';

import {
  addPostService,
  deletePostByIdService,
  getPostService,
  getUserProfileByIdServices,
  LoginService,
  postUpdateServiceById,
  RegisterService,
} from '../services/services';

import {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
  GetPostResponse,
  GetProfileResponse,
  GetProfileParams,
  ErrorResponse,
  AddPostRequest,
  AddPostResponse,
} from '../../types/types';

/* -------------------------------------------------------------------------- */
/*                              Register Thunk                                */
/* -------------------------------------------------------------------------- */

export const RegisterThunk = createAsyncThunk<
  RegisterResponse,
  RegisterPayload,
  { rejectValue: string }
>(ASYNC_ROUTES.REGISTER, async (payload, { rejectWithValue }) => {
  try {
    return await RegisterService(payload);
  } catch (error: any) {
    return rejectWithValue(error?.message || 'Registration failed');
  }
});

/* -------------------------------------------------------------------------- */
/*                                Login Thunk                                 */
/* -------------------------------------------------------------------------- */

export const LoginThunk = createAsyncThunk<
  LoginResponse,
  LoginPayload,
  { rejectValue: string }
>(ASYNC_ROUTES.LOGIN, async (payload, { rejectWithValue }) => {
  try {
    return await LoginService(payload);
  } catch (error: any) {
    return rejectWithValue(error?.message || 'Login failed');
  }
});

/* -------------------------------------------------------------------------- */
/*                              Get Posts Thunk                               */
/* -------------------------------------------------------------------------- */

export const getPostThunk = createAsyncThunk<
  GetPostResponse,
  void,
  { rejectValue: string }
>(ASYNC_ROUTES.GET_POST, async (_, { rejectWithValue }) => {
  try {
    return await getPostService();
  } catch (err: any) {
    return rejectWithValue(err?.message || 'Unable to fetch posts');
  }
});

/* -------------------------------------------------------------------------- */
/*                    Get User Profile By ID Thunk (FIXED)                    */
/* -------------------------------------------------------------------------- */

export const getUserProfileByIdThunk = createAsyncThunk<
  GetProfileResponse, // Thunk return type
  GetProfileParams, // Argument type
  { rejectValue: ErrorResponse }
>(ASYNC_ROUTES.GET_PROFILE_BY_ID, async ({ id }, { rejectWithValue }) => {
  try {
    const response = await getUserProfileByIdServices({ id });

    console.log(response, 'thunk profile response');

    return response;
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data || { message: 'Unable to fetch profile' },
    );
  }
});

// Add Post
export const addPostAsyncThunk = createAsyncThunk(
  ASYNC_ROUTES.ADD_POST,
  async (payload: AddPostRequest, { rejectWithValue }) => {
    try {
      const response = await addPostService(payload);
      return response.data;
    } catch (error: any) {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        'Something went wrong while adding post';
      return rejectWithValue(msg);
    }
  },
);

// Delete Post By Id Thunk
export const deletePostByIdThunk = createAsyncThunk(
  ASYNC_ROUTES.DELETE_POST_BY_ID,
  async ({ postId }: { postId: string }, { rejectWithValue }) => {
    try {
      const response = await deletePostByIdService(postId);
      return { postId, response };
    } catch (error: any) {
      return rejectWithValue(error?.response?.data || 'Delete failed');
    }
  },
);

//Post Update Thunk
export const postUpdateByIdAsyncThunk = createAsyncThunk<
  AddPostResponse,
  AddPostRequest & { postId: string },
  { rejectValue: string }
>(SERVICE_ROUTES.UPDATE_POST_BY_ID, async (payload, { rejectWithValue }) => {
  try {
    const response = await postUpdateServiceById(payload);
    return response;
  } catch (error: any) {
    const msg =
      error?.response?.data?.message ||
      error?.message ||
      'Something went wrong while editing post';
    return rejectWithValue(msg);
  }
});
