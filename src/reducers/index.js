import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import user from './user';
import runtime from './runtime';
import addResResult from './addResResult';
import toast from './toast';

export default combineReducers({
  form,
  addResResult,
  toast,
  user,
  runtime,
});