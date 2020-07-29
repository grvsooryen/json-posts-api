import { GET_ARTICLE, GET_ARTICLE_SUCCESS, GET_ARTICLE_ERROR } from './types';

export function getArticle(postId = 1) {
  const apiUrl = `http://jsonplaceholder.typicode.com/posts/${postId}`;
  return (dispatch) => {
    dispatch({ type: GET_ARTICLE });
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => dispatch({ type: GET_ARTICLE_SUCCESS, payload: data }))
      .catch((e) => dispatch({ type: GET_ARTICLE_ERROR, payload: e.message }));
  };
}

export default {};
