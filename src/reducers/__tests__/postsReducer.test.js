import postReducer, { initialState } from '../postsReducer';
import {
  GET_POSTS_SUCCESS,
  GET_POSTS_ERROR,
  UPDATE_POST,
  UPDATE_PAGE_NUMBER,
} from '../../actions/types';

describe('Posts Reducer', () => {
  const MOCK_POST_LIST = [
    {
      id: 1,
      userId: 1,
      title: 'test 1',
      body: 'post Body 1',
    },
    {
      id: 2,
      userId: 1,
      title: 'test 2',
      body: 'post Body 2',
    },
    {
      id: 3,
      userId: 1,
      title: 'test 3',
      body: 'post Body 3',
    },
  ];

  const MOCK_POST_ITEM = {
    id: 3,
    title: 'test title',
    body: 'test post',
  };

  it('Should handle an initial state', () => {
    expect(postReducer()).toEqual(initialState);
  });

  it('Should handle GET_POSTS_SUCCESS', () => {
    expect(postReducer(initialState, {
      type: GET_POSTS_SUCCESS,
      payload: MOCK_POST_LIST,
    })).toEqual({
      items: MOCK_POST_LIST,
      isLoading: false,
      error: '',
      pageNumber: 1,
    });
  });

  it('Should handle GET_POSTS_ERROR', () => {
    expect(postReducer(initialState, {
      type: GET_POSTS_ERROR,
      payload: 'Not Found',
    })).toEqual({
      items: [],
      isLoading: false,
      error: 'Not Found',
      pageNumber: 1,
    });
  });

  it('Should handle UPDATE_PAGE_NUMBER', () => {
    expect(postReducer(initialState, {
      type: UPDATE_PAGE_NUMBER,
      payload: 5,
    })).toEqual({
      items: [],
      isLoading: false,
      error: '',
      pageNumber: 5,
    });
  });

  it('Should handle UPDATE_POST', () => {
    expect(postReducer({
      ...initialState,
      items: MOCK_POST_LIST,
    }, {
      type: UPDATE_POST,
      payload: MOCK_POST_ITEM,
    })).toEqual({
      ...initialState,
      items: [
        {
          id: 1,
          userId: 1,
          title: 'test 1',
          body: 'post Body 1',
        },
        {
          id: 2,
          userId: 1,
          title: 'test 2',
          body: 'post Body 2',
        },
        {
          id: 3,
          userId: 1,
          title: 'test title',
          body: 'test post',
        },
      ],
    });
  });
});
