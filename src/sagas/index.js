import { all } from 'redux-saga/effects';
import { watchGetPosts } from './getPosts';
import { watchgetArticle } from './getArticle';

export default function* rootSaga() {
  yield all([
    watchGetPosts(),
    watchgetArticle(),
  ]);
}
