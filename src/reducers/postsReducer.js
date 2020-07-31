import {
  GET_POSTS,
  GET_POSTS_SUCCESS,
  GET_POSTS_ERROR,
  UPDATE_POST,
  UPDATE_PAGE_NUMBER,
} from '../actions/types';

export const initialState = {
  isLoading: false,
  items: [],
  error: '',
  pageNumber: 1,
};

export default function postReducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_POSTS:
      return { ...state, isLoading: true };
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        items: action.payload,
        isLoading: false,
        error: '',
      };
    case GET_POSTS_ERROR:
      return { ...state, error: action.payload, isLoading: false };
    case UPDATE_POST:
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              ...action.payload,
            };
          }
          return item;
        }),
      };
    case UPDATE_PAGE_NUMBER:
      return { ...state, pageNumber: action.payload };
    default:
      return state;
  }
}
