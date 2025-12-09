import { createAsyncThunk } from '@reduxjs/toolkit';
import { ASYNC_ROUTES, SERVICE_ROUTES } from '../constants';

import {
  addCommentService,
  addPostService,
  deleteCommentsByIdService,
  deletePostByIdService,
  getCommentService,
  getPostLikeByIdService,
  getPostService,
  getUserProfileByIdServices,
  LoginService,
  postUpdateServiceById,
  RegisterService,
  updateCommentByIdService,
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
  AddCommentRequest,
  AddCommentResponse,
  GetCommentResponse,
  UpdateCommentRequest,
  LikePostResponse,
  LikePostParams,
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

// Add Comment Thunk
export const addCommentAsyncThunk = createAsyncThunk<
  AddCommentResponse, // Thunk return type
  AddCommentRequest, // Argument type
  { rejectValue: string } // Reject value type
>(
  ASYNC_ROUTES.GET_COMMENTS, // Action type string
  async (payload: AddCommentRequest, { rejectWithValue }) => {
    try {
      const response = await addCommentService(payload);
      return response; // This will be returned as the fulfilled value
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to add comment');
    }
  },
);

// Get Comments Thunk
export const getCommentsThunk = createAsyncThunk<
  GetCommentResponse, // Return type: GetCommentResponse
  { postId: string }, // Argument type: Accept postId parameter
  { rejectValue: string }
>(
  'comments/getComments', // Action type
  async ({ postId }, { rejectWithValue }) => {
    try {
      const response = await getCommentService(postId); // Pass postId to the service
      return response; // Return the response, which will be GetCommentResponse
    } catch (err: any) {
      return rejectWithValue(err?.message || 'Unable to fetch comments');
    }
  },
);

// Delete Post By Id Thunk
export const deleteCommentByIdThunk = createAsyncThunk(
  ASYNC_ROUTES.DELETE_COMMENTS_BY_ID,
  async ({ commentId }: { commentId: string }, { rejectWithValue }) => {
    try {
      const response = await deleteCommentsByIdService(commentId);
      return { commentId, response };
    } catch (error: any) {
      return rejectWithValue(error?.response?.data || 'Delete failed');
    }
  },
);
// Update Comment Thunk
export const updateCommentByIdAsyncThunk = createAsyncThunk<
  AddCommentResponse, // 👈 agar response same hai to use this
  UpdateCommentRequest, // 👈 naya type
  { rejectValue: string }
>(
  SERVICE_ROUTES.UPDATE_COMMENTS_BY_ID,
  async ({ commentId, comment }, { rejectWithValue }) => {
    try {
      const response = await updateCommentByIdService(commentId, { comment });
      return response;
    } catch (error: any) {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        'Something went wrong while editing comment';
      return rejectWithValue(msg);
    }
  },
);
// Like Post By Id Thunk
export const getPostLikeByIdThunk = createAsyncThunk<
  any, // returned payload
  { id: string; body?: { userId: string } }, // arg includes body
  { rejectValue: ErrorResponse }
>(
  ASYNC_ROUTES.LIKE_POST_BY_ID, // or ASYNC_ROUTES.LIKE_POST_BY_ID
  async (args, { rejectWithValue }) => {
    try {
      const res = await getPostLikeByIdService(args);
      console.log('like response (thunk):', res);
      return res;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data ?? {
          message: error?.message ?? 'Unable to like post',
        },
      );
    }
  },
);
