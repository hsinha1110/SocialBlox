import { combineReducers } from '@reduxjs/toolkit';
import authSlices from './slice';
import postSlices from './post';

const rootReducer = combineReducers({
  auth: authSlices,
  post: postSlices,
});

export default rootReducer;
