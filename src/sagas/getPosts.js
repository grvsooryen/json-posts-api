import { put, takeLatest, call } from 'redux-saga/effects';
import {
  GET_POSTS,
} from '../actions/types';
import { fetchPostsApi } from '../api';
import { getPostsSuccess, getPostsError } from '../actions/postsAction';

export function* getPosts() {
  try {
    const postData = yield call(fetchPostsApi);
    yield put(getPostsSuccess(postData));
  } catch (error) {
    yield put(getPostsError(error.toString()));
  }
}

export function* watchGetPosts() {
  yield takeLatest(GET_POSTS, getPosts);
}
