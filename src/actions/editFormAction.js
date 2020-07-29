import { SHOW_DIALOG, HIDE_DIALOG, EDIT_POST } from './types';

export const showDialog = () => ({ type: SHOW_DIALOG });
export const hideDialog = () => ({ type: HIDE_DIALOG });
export const editDialog = (payload) => ({ type: EDIT_POST, payload });
