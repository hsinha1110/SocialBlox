import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { METHODS, replaceUrl, SERVICE_ROUTES } from '../constants';

import {
  AddCommentResponse,
  AddPostRequest,
  AddPostResponse,
  GetCommentResponse,
  GetPostResponse,
  GetProfileParams,
  GetProfileResponse,
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
} from '../../types/types';
import { AddCommentRequest } from '../../types/types';
// Register Service
export const RegisterService = async (
  data: RegisterPayload,
): Promise<RegisterResponse> => {
  try {
    const config: AxiosRequestConfig = {
      url: SERVICE_ROUTES.REGISTER,
      method: METHODS.POST,
      data,
    };

    const response = await axios.request<RegisterResponse>(config);
    console.log('Register response:', response.data);

    return response.data;
  } catch (error: any) {
    console.error(
      'Error in RegisterService:',
      error?.response?.data || error.message,
    );
    throw error;
  }
};

// Login Service
export const LoginService = async (
  data: LoginPayload,
): Promise<LoginResponse> => {
  try {
    const config: AxiosRequestConfig = {
      url: SERVICE_ROUTES.LOGIN,
      method: METHODS.POST,
      data,
    };

    const response = await axios.request<LoginResponse>(config);
    console.log('Login response:', response.data);

    return response.data;
  } catch (error: any) {
    console.error(
      'Error in LoginService:',
      error?.response?.data || error.message,
    );
    throw error;
  }
};

// Get Posts Service
export const getPostService = async (): Promise<GetPostResponse> => {
  try {
    const config: AxiosRequestConfig = {
      url: SERVICE_ROUTES.GET_POST,
      method: METHODS.GET,
    };

    const response = await axios.request<GetPostResponse>(config);
    return response.data;
  } catch (error: any) {
    console.error(
      'Error in getPostService:',
      error?.response?.data || error.message,
    );
    throw new Error(error?.response?.data?.message || 'Unable to fetch posts');
  }
};

// getUserProfileById
export const getUserProfileByIdServices = async ({
  id,
}: GetProfileParams): Promise<GetProfileResponse> => {
  try {
    const config: AxiosRequestConfig = {
      url: replaceUrl(SERVICE_ROUTES.GET_PROFILE_BY_ID, { id }),
      method: METHODS.GET,
    };

    const response: AxiosResponse<GetProfileResponse> =
      await axios.request<GetProfileResponse>(config);

    console.log(response.data.data, '✔ profile service response');

    return response.data;
  } catch (error: any) {
    console.error('Profile Service Error:', error?.response?.data);
    throw error;
  }
};

export const addPostService = async (
  payload: AddPostRequest,
): Promise<AddPostResponse> => {
  const { userId, caption, username, imageUri } = payload;

  const formData = new FormData();

  formData.append('userId', userId);
  formData.append('caption', caption);
  formData.append('username', username);

  if (imageUri) {
    const fileName = imageUri.split('/').pop() || 'photo.jpg';
    const ext = fileName.split('.').pop() || 'jpg';
    const mimeType = `image/${ext}`;

    formData.append('imageUrl', {
      uri: imageUri,
      name: fileName,
      type: mimeType,
    } as any);
  }

  const { data } = await axios.post<AddPostResponse>(
    SERVICE_ROUTES.ADD_POST,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return data;
};

// Delete Post By Id Service
export const deletePostByIdService = async (postId: string) => {
  const url = replaceUrl(SERVICE_ROUTES.DELETE_POST_BY_ID, { id: postId });

  const response = await axios({
    url,
    method: METHODS.DELETE,
  });

  return response.data;
};

// Update Post Service
export const postUpdateServiceById = async (
  payload: AddPostRequest & { postId: string },
): Promise<AddPostResponse> => {
  const { postId, userId, caption, username, imageUri } = payload;

  const formData = new FormData();
  formData.append('userId', userId);
  formData.append('caption', caption);
  formData.append('username', username);

  if (imageUri) {
    const fileName = imageUri.split('/').pop() || 'photo.jpg';
    const ext = fileName.split('.').pop() || 'jpg';
    const mimeType = `image/${ext}`;
    formData.append('imageUrl', {
      uri: imageUri,
      name: fileName,
      type: mimeType,
    } as any);
  }

  // ✅ Correctly replace :id in URL
  const url = replaceUrl(SERVICE_ROUTES.UPDATE_POST_BY_ID, { id: postId });

  const { data } = await axios.put<AddPostResponse>(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};

// Add Comment Service
export const addCommentService = async (
  payload: AddCommentRequest,
): Promise<AddCommentResponse> => {
  try {
    const config: AxiosRequestConfig = {
      url: SERVICE_ROUTES.ADD_COMMENTS, // Your endpoint URL
      method: 'POST',
      data: payload,
    };

    const response = await axios.request<AddCommentResponse>(config);
    return response.data; // Return the response data as the AddCommentResponse
  } catch (error: any) {
    console.error('Add Comment Service Error:', error);
    throw new Error(error?.response?.data?.message || 'Unable to add comment');
  }
};
// Get Posts Service
export const getCommentService = async (
  postId: string,
): Promise<GetCommentResponse> => {
  try {
    const config: AxiosRequestConfig = {
      url: SERVICE_ROUTES.GET_COMMENTS, // Make sure this endpoint returns all comments
      method: METHODS.GET,
    };

    const response = await axios.request<GetCommentResponse>(config);
    return response.data; // Return the actual response data (comments)
  } catch (error: any) {
    console.error(
      'Error in getCommentService:',
      error?.response?.data || error.message,
    );
    throw new Error(
      error?.response?.data?.message || 'Unable to fetch comments',
    );
  }
};
// Delete Comments By Id Service
export const deleteCommentsByIdService = async (commentId: string) => {
  const url = replaceUrl(SERVICE_ROUTES.DELETE_COMMENTS_BY_ID, {
    id: commentId,
  });

  const response = await axios({
    url,
    method: METHODS.DELETE,
  });

  return response.data;
};

// Update Comment By Id Service
// Update Comment By Id Service
export const updateCommentByIdService = async (
  commentId: string,
  data: { comment: string },
) => {
  const url = replaceUrl(SERVICE_ROUTES.UPDATE_COMMENTS_BY_ID, {
    id: commentId,
  });

  const response = await axios({
    url,
    method: METHODS.PUT, // ✅ UPDATE ke liye PUT ya PATCH (jo backend use kar raha hai)
    data, // { comment: 'new text' }
  });

  return response.data;
};
// getUserProfileById

type LikePostParams = { id: string; body?: { userId: string } | any };

export const getPostLikeByIdService = async ({
  id,
  body,
}: LikePostParams): Promise<any> => {
  try {
    const config: AxiosRequestConfig = {
      url: replaceUrl(SERVICE_ROUTES.LIKE_POST_BY_ID, { id }),
      method: METHODS.PUT,
      data: body ?? {},
    };

    const response: AxiosResponse<any> = await axios.request(config);

    console.log('like post raw response:', response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      'Like Post Service Error:',
      error?.response?.data ?? error.message,
    );
    throw error;
  }
};
