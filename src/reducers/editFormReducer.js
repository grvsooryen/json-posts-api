import { SHOW_DIALOG, HIDE_DIALOG, EDIT_POST } from '../actions/types';

export const initialState = {
  isOpen: false,
  id: 0,
  title: '',
  body: '',
};

export default function editFormReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SHOW_DIALOG:
      return {
        ...state,
        isOpen: true,
      };
    case HIDE_DIALOG:
      return {
        ...state,
        isOpen: false,
        id: 0,
        title: '',
        body: '',
      };
    case EDIT_POST:
      return {
        ...state,
        ...action.payload,
        isOpen: true,
      };
    default:
      return state;
  }
}
