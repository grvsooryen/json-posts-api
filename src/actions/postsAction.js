import {
  GET_POSTS,
  GET_POSTS_SUCCESS,
  GET_POSTS_ERROR,
  UPDATE_POST,
  UPDATE_PAGE_NUMBER,
} from './types';

export const getPosts = () => ({ type: GET_POSTS });
export const getPostsSuccess = (payload) => ({ type: GET_POSTS_SUCCESS, payload });
export const getPostsError = (payload) => ({ type: GET_POSTS_ERROR, payload });
export const updatePost = (payload) => ({ type: UPDATE_POST, payload });
export const updatePageNumber = (payload) => ({ type: UPDATE_PAGE_NUMBER, payload });

export default {};
