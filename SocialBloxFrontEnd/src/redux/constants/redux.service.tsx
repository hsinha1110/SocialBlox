export interface ReplaceUrlData {
  [key: string]: string | number | undefined;
}

// Service routes
export const SERVICE_ROUTES = {
  REGISTER: '/api/auth/register',
  LOGIN: '/api/auth/login',
  ADD_POST: '/api/post/addpost',
  GET_POST: '/api/post/getpost',
  UPDATE_POST_BY_ID: '/api/post/updatepost/:id',
  GET_PROFILE_BY_ID: '/api/users/getUser/:id',
  DELETE_POST_BY_ID: '/api/post/deletepost/:id',
} as const;

// HTTP Methods
export const METHODS = {
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
  PUT: 'PUT',
  PATCH: 'PATCH',
} as const;

// Utility function to replace params in URL
export const replaceUrl = (url: string, data: ReplaceUrlData): string => {
  return url.replace(/:([a-zA-Z]+)/g, (_, key) => {
    return data[key] !== undefined ? String(data[key]) : _;
  });
};
