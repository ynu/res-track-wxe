import { combineReducers } from 'redux';
import { FETCHING, FETCH_FAILED } from '../actions/common';
import { ADD_RESOURCE_DONE } from '../constants';

const loading = (state = false, action) => {
  switch (action.type) {
    case FETCHING:
      return true;
    case FETCH_FAILED:
    case ADD_RESOURCE_DONE:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  loading,
});
