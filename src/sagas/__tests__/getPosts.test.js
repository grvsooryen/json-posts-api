import { runSaga } from 'redux-saga';
import { GET_POSTS_SUCCESS, GET_POSTS_ERROR } from '../../actions/types';
import * as api from '../../api';
import { getPosts } from '../getPosts';

describe('getPosts', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call api and dispatch success action', async () => {
    const mockPostsData = [];
    const requestPosts = jest.spyOn(api, 'fetchPostsApi')
      .mockImplementation(() => Promise.resolve(mockPostsData));

    const dispatchedActions = [];
    await runSaga({
      dispatch: (action) => dispatchedActions.push(action),
    }, getPosts);

    expect(requestPosts).toHaveBeenCalledTimes(1);
    expect(dispatchedActions).toEqual([
      { type: GET_POSTS_SUCCESS, payload: mockPostsData },
    ]);
  });

  it('should call api and dispatch error action', async () => {
    const mockError = 'Not found';
    const requestPosts = jest.spyOn(api, 'fetchPostsApi')
      .mockImplementation(() => Promise.reject(mockError));

    const dispatchedActions = [];
    await runSaga({
      dispatch: (action) => dispatchedActions.push(action),
    }, getPosts);

    expect(requestPosts).toHaveBeenCalledTimes(1);
    expect(dispatchedActions).toEqual([
      { type: GET_POSTS_ERROR, payload: mockError },
    ]);
  });
});
