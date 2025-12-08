export interface RegisterPayload {
  username: string;
  emailId: string;
  mobile: string;
  gender: string;
  password: string;
}

export interface RegisterResponse {
  status: boolean;
  message: string;
  data: {
    userId: string;
    accessToken: string;
  };
}

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

export interface LoginPayload {
  emailId: string;
  password: string;
}

export interface LoginResponse {
  data: any;
  message: string;
  userId?: string;
  accessToken?: string;
  username?: string;
}

export interface PostItem {
  id: string;
  title: string;
  image: string;
  createdAt: string;
}
export interface GetPostPayload {
  userId?: string;
  page?: number;
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
export interface AddPostRequest {
  userId: string;
  caption: string;
  username: string;
  imageUri?: string | null;
}

export interface AddPostResponse {
  status: boolean;
  message: string;
  data: any;
}
