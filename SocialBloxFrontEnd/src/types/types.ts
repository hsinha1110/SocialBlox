// Type for register request payload
// REGISTER REQUEST PAYLOAD
export interface RegisterPayload {
  username: string;
  emailId: string;
  mobile: string;
  gender: string;
  password: string;
}

// REGISTER RESPONSE (from backend)
export interface RegisterResponse {
  status: boolean;
  message: string;
  data: {
    userId: string;
    accessToken: string;
  };
}

// USER MODEL (used in Redux)
export interface User {
  _id: string;
  username: string;
  emailId: string;
  mobile: string;
  gender: string;
  profilePic?: string;
  coverPic?: string;
}

interface UserData {
  data: {
    access_token: string;
    [key: string]: any;
  };
  [key: string]: any;
}

export interface LoginSuccessPayload {
  data: UserData;
}

// ----------------------
// Initial State
// ----------------------
export interface LoginPayload {
  emailId: string; // must match backend
  password: string;
}

export interface LoginResponse {
  data: any;
  message: string;
  userId?: string;
  accessToken?: string;
}
export interface GetPostPayload {
  userId?: string;
  page?: number;
}

export interface PostItem {
  id: string;
  title: string;
  image: string;
  createdAt: string;
}

export interface GetPostResponse {
  posts: never[];
  message: string;
  data: PostItem[];
}

export interface GetProfileParams {
  id: string;
}

export interface UserProfile {
  username: string;
  emailId: string;
}

export interface GetProfileResponse {
  data: UserProfile;
}

export interface ErrorResponse {
  message: string;
}
export interface GetProfileParams {
  id: string;
}

export interface UserProfile {
  username: string;
  emailId: string;
  mobile?: string;
  gender?: string;
}

export interface GetProfileResponse {
  data: UserProfile;
}
