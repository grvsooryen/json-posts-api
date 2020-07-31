import { runSaga } from 'redux-saga';
import { GET_ARTICLE_SUCCESS, GET_ARTICLE_ERROR } from '../../actions/types';
import * as api from '../../api';
import { getArticle } from '../getArticle';

describe('getArticle', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const MOCK_POST_ITEM = {
    id: 1,
    title: 'test title',
    body: 'test post',
  };

  it('should call api and dispatch success action', async () => {
    const requestArticle = jest.spyOn(api, 'fetchArticleApi')
      .mockImplementation(() => Promise.resolve(MOCK_POST_ITEM));

    const dispatchedActions = [];
    await runSaga({
      getState: () => ({ article: { nextPostId: 1 } }),
      dispatch: (action) => dispatchedActions.push(action),
    }, getArticle);

    expect(requestArticle).toHaveBeenCalledTimes(1);
    expect(dispatchedActions).toEqual([
      { type: GET_ARTICLE_SUCCESS, payload: MOCK_POST_ITEM },
    ]);
  });

  it('should call api and dispatch error action', async () => {
    const mockError = 'Not found';
    const requestArticle = jest.spyOn(api, 'fetchArticleApi')
      .mockImplementation(() => Promise.reject(new Error(mockError)));

    const dispatchedActions = [];
    await runSaga({
      getState: () => ({ article: { nextPostId: 1 } }),
      dispatch: (action) => dispatchedActions.push(action),
    }, getArticle);

    expect(requestArticle).toHaveBeenCalledTimes(1);
    expect(dispatchedActions).toEqual([
      { type: GET_ARTICLE_ERROR, payload: `Error: ${mockError}` },
    ]);
  });
});
