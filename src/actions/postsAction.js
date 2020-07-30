import {
  GET_POSTS,
  GET_POSTS_SUCCESS,
  GET_POSTS_ERROR,
  UPDATE_POST,
  UPDATE_PAGE_NUMBER,
} from './types';
import fetchApi from '../api/fetchApi';

export function getPosts() {
  const apiPath = '/posts';
  return (dispatch) => {
    dispatch({ type: GET_POSTS });
    fetchApi(apiPath)
      .then((response) => response.json())
      .then((data) => dispatch({ type: GET_POSTS_SUCCESS, payload: data }))
      .catch((e) => dispatch({ type: GET_POSTS_ERROR, payload: e.message }));
  };
}

export const updatePost = (payload) => ({ type: UPDATE_POST, payload });
export const updatePageNumber = (payload) => ({ type: UPDATE_PAGE_NUMBER, payload });

export default {};
