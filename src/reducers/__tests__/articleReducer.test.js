import articleReducer, { initialState } from '../articleReducer';
import {
  GET_ARTICLE_SUCCESS,
  GET_ARTICLE_ERROR,
} from '../../actions/types';

describe('Posts Reducer', () => {
  const MOCK_POST_ITEM = {
    id: 3,
    userId: 1,
    title: 'test title',
    body: 'test post',
  };

  it('Should handle an initial state', () => {
    expect(articleReducer()).toEqual(initialState);
  });

  it('Should handle GET_ARTICLE_SUCCESS', () => {
    expect(articleReducer(initialState, {
      type: GET_ARTICLE_SUCCESS,
      payload: MOCK_POST_ITEM,
    })).toEqual({
      ...initialState,
      ...MOCK_POST_ITEM,
    });
  });

  it('Should handle GET_ARTICLE_ERROR', () => {
    expect(articleReducer(initialState, {
      type: GET_ARTICLE_ERROR,
      payload: 'Not Found',
    })).toEqual({
      ...initialState,
      error: 'Not Found',
    });
  });
});
