import { combineReducers } from 'redux';
import postsReducers from './postsReducer';
import headerReducer from './headerReducer';
import editFormReducer from './editFormReducer';
import articleReducer from './articleReducer';

export default combineReducers({
  header: headerReducer,
  posts: postsReducers,
  editForm: editFormReducer,
  article: articleReducer,
});
