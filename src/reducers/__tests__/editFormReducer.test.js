import editFormReducer, { initialState } from '../editFormReducer';
import { SHOW_DIALOG, HIDE_DIALOG, EDIT_POST } from '../../actions/types';

describe('edit form Reducer', () => {
  const MOCK_POST_ITEM = {
    id: 3,
    title: 'test title',
    body: 'test post',
  };

  it('Should handle an initial state', () => {
    expect(editFormReducer()).toEqual(initialState);
  });

  it('Should handle SHOW_DIALOG', () => {
    expect(editFormReducer(initialState, {
      type: SHOW_DIALOG,
    })).toEqual({
      ...initialState,
      isOpen: true,
    });
  });

  it('Should handle HIDE_DIALOG', () => {
    expect(editFormReducer(initialState, {
      type: HIDE_DIALOG,
    })).toEqual({
      ...initialState,
      isOpen: false,
      id: 0,
      title: '',
      body: '',
    });
  });

  it('Should handle EDIT_POST', () => {
    expect(editFormReducer(initialState, {
      type: EDIT_POST,
      payload: MOCK_POST_ITEM,
    })).toEqual({
      ...initialState,
      id: 3,
      title: 'test title',
      body: 'test post',
      isOpen: true,
    });
  });
});
