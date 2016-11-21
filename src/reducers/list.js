import { combineReducers } from 'redux';
import { FETCHING, FETCH_FAILED, FETCH_DONE } from '../actions/common';
import { SET_LIST_PARAMS } from '../constants';

const data = (state = [], action) => {
  switch (action.type) {
    case FETCH_DONE:
      return action.data;
    case FETCHING:
    case FETCH_FAILED:
    default:
      return state;
  }
};

const params = (state = {}, action) => {
  switch (action.type) {
    case SET_LIST_PARAMS:
      return action.params;
    default:
      return state;
  }
};

export default combineReducers({
  data,
  params,
});
