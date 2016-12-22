import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import user from './user';
import runtime from './runtime';
import addResResult from './addResResult';
import toast from './toast';
import list from './list';
import resCatagories from './res-catagories';
import confirm from './confirm';
import detail from './detail';
import uploader from './uploader';

export default combineReducers({
  form,
  addResResult,
  toast,
  list,
  resCatagories,
  confirm,
  detail,
  uploader,
  user,
  runtime,
});
