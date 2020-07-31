import {
  GET_ARTICLE,
  GET_ARTICLE_SUCCESS,
  GET_ARTICLE_ERROR,
} from '../actions/types';

export const initialState = {
  isLoading: false,
  nextPostId: 0,
  items: [],
  error: '',
  userId: 0,
  id: 0,
  title: '',
  body: '',
};

export default function articleReducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_ARTICLE:
      return { ...state, isLoading: true, nextPostId: action.payload };
    case GET_ARTICLE_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        error: '',
      };
    case GET_ARTICLE_ERROR:
      return { ...state, error: action.payload, isLoading: false };
    default:
      return state;
  }
}
