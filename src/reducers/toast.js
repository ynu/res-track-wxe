import { combineReducers } from 'redux';
import { FETCHING, FETCH_FAILED, FETCH_DONE } from '../actions/common';

const loading = (state = false, action) => {
  switch (action.type) {
    case FETCHING:
      return true;
    case FETCH_FAILED:
    case FETCH_DONE:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  loading,
});
