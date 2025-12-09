export interface RegisterPayload {
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
  mobile: string;
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

export interface AddCommentRequest {
  userId: string;
  postId: string;
  comment: string;
  username: string;
}

export interface AddCommentResponse {
  status: boolean;
  message: string;
  data: Comment; // Directly use the Comment interface
}
export interface GetCommentResponse {
  status: boolean; // Indicates whether the request was successful or not
  message: string; // Message providing more details about the response
  data: Comment[]; // The array of comments
}

export interface Comment {
  _id: any;
  comment: string; // The comment text
  userId: string; // The user ID of the person who posted the comment
  postId: string; // The ID of the post to which this comment belongs
  username: string; // The username of the person who posted the comment
  createdAt: string; // Timestamp of when the comment was created
}
export interface CommentScreenParams {
  postId: string;
  userId: string;
  username: string;
}

export interface Comment {
  username: string;
  comment: string;
}
export interface CommentScreenParams {
  postId: string;
  userId: string;
  username: string;
}
export interface UpdateCommentRequest {
  commentId: string;
  comment: string;
}

export interface LikePostParams {
  id: string; // post id (URL param)
  body?: { userId: string } | Record<string, any>;
}

export interface LikePostResponse {
  // backend returns either { status: true, message: "..." } or envelope etc.
  status?: boolean;
  message?: string;
  data?: any;
  [k: string]: any;
}
