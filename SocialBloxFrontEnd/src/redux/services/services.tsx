import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { METHODS, replaceUrl, SERVICE_ROUTES } from '../constants';

import {
  AddPostRequest,
  AddPostResponse,
  GetPostResponse,
  GetProfileParams,
  GetProfileResponse,
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
} from '../../types/types';

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
    } as any); // backend expects "imageUrl"
  }

  // Replace :id in URL
  const url = replaceUrl(SERVICE_ROUTES.UPDATE_POST_BY_ID, { id: postId });

  const { data } = await axios.put<AddPostResponse>(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};
