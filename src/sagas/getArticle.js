import { put, takeLatest, call, select } from 'redux-saga/effects';
import { GET_ARTICLE } from '../actions/types';
import { fetchArticleApi } from '../api';
import { getArticleSuccess, getArticleError } from '../actions/articleAction';

export function* getArticle() {
  const getPostId = (state) => state.article.nextPostId;
  try {
    const postId = yield select(getPostId);
    const articleData = yield call(fetchArticleApi, postId);
    yield put(getArticleSuccess(articleData));
  } catch (error) {
    yield put(getArticleError(error.toString()));
  }
}

export function* watchgetArticle() {
  yield takeLatest(GET_ARTICLE, getArticle);
}
