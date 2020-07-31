import { GET_ARTICLE, GET_ARTICLE_SUCCESS, GET_ARTICLE_ERROR } from './types';

export const getArticle = (payload = 1) => ({ type: GET_ARTICLE, payload });
export const getArticleSuccess = (payload) => ({ type: GET_ARTICLE_SUCCESS, payload });
export const getArticleError = (payload) => ({ type: GET_ARTICLE_ERROR, payload });

export default {};
