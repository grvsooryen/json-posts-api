import headerReducer, { initialState } from '../headerReducer';
import {
  TOGGLE_SEARCH,
  TOGGLE_SEARCH_INPUT,
  UPDATE_SEARCH_INPUT_TEXT,
} from '../../actions/types';

describe('Header Reducer', () => {
  it('Should handle an initial state', () => {
    expect(headerReducer()).toEqual(initialState);
  });

  it('Should handle TOGGLE_SEARCH', () => {
    expect(headerReducer(initialState, {
      type: TOGGLE_SEARCH,
      payload: { isSearchShown: true },
    })).toEqual({
      ...initialState,
      isSearchShown: true,
    });
  });

  it('Should handle TOGGLE_SEARCH_INPUT', () => {
    expect(headerReducer(initialState, {
      type: TOGGLE_SEARCH_INPUT,
      payload: { isSearchInputShown: false },
    })).toEqual({
      ...initialState,
      isSearchInputShown: false,
    });
  });
  it('Should handle UPDATE_SEARCH_INPUT_TEXT', () => {
    expect(headerReducer(initialState, {
      type: UPDATE_SEARCH_INPUT_TEXT,
      payload: { searchInputText: 'Some Text' },
    })).toEqual({
      ...initialState,
      searchInputText: 'Some Text',
    });
  });
});
