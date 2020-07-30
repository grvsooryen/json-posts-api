import { GET_ARTICLE, GET_ARTICLE_SUCCESS, GET_ARTICLE_ERROR } from './types';
import fetchApi from '../api/fetchApi';

export const getArticle = (postId = 1) => {
  const apiPath = `/posts/${postId}`;
  return (dispatch) => {
    dispatch({ type: GET_ARTICLE });
    fetchApi(apiPath)
      .then((response) => response.json())
      .then((data) => dispatch({ type: GET_ARTICLE_SUCCESS, payload: data }))
      .catch((e) => dispatch({ type: GET_ARTICLE_ERROR, payload: e.message }));
  };
};

export default {};
