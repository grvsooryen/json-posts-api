import {
  TOGGLE_SEARCH,
  TOGGLE_SEARCH_INPUT,
  UPDATE_SEARCH_INPUT_TEXT,
} from './types';

export const toggleSearch = (payload) => ({ type: TOGGLE_SEARCH, payload });
export const toggleSearchInput = (payload) => ({ type: TOGGLE_SEARCH_INPUT, payload });
export const updateSearchInputText = (payload) => ({ type: UPDATE_SEARCH_INPUT_TEXT, payload });
