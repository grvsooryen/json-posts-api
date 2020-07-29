import { SHOW_SEARCH_INPUT, HIDE_SEARCH_INPUT } from '../actions/types';

const initialState = {
  title: 'Typicode Posts',
  showSearch: true,
};

export default function headerReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SHOW_SEARCH_INPUT:
      return {
        ...state,
        showSearch: true,
      };
    case HIDE_SEARCH_INPUT:
      return {
        ...state,
        showSearch: false,
      };
    default:
      return state;
  }
}
