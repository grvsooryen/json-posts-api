import {
  TOGGLE_SEARCH,
  TOGGLE_SEARCH_INPUT,
  UPDATE_SEARCH_INPUT_TEXT,
} from '../actions/types';

import config from '../config'

export const initialState = {
  title: config.blogTitle,
  isSearchShown: true,
  isSearchInputShown: false,
  searchInputText: '',
};

export default function headerReducer(state = initialState, action = {}) {
  switch (action.type) {
    case TOGGLE_SEARCH:
      return {
        ...state,
        isSearchShown: action.payload.isSearchShown,
      };
    case TOGGLE_SEARCH_INPUT:
      return {
        ...state,
        isSearchInputShown: action.payload.isSearchInputShown,
      };
    case UPDATE_SEARCH_INPUT_TEXT:
      return {
        ...state,
        searchInputText: action.payload.searchInputText,
      };
    default:
      return state;
  }
}
