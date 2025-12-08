import { createAsyncThunk } from '@reduxjs/toolkit';
import { ASYNC_ROUTES } from '../constants';

import {
  getPostService,
  getUserProfileByIdServices,
  LoginService,
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

    console.log(response, '✔ thunk profile response');

    return response; // already 'data' from service
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data || { message: 'Unable to fetch profile' },
    );
  }
});
