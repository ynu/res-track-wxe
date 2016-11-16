import { ADD_RESOURCE_DONE } from '../constants';
import { FETCHING, FETCH_FAILED } from '../actions/common';

export default (state = null, action) => {
  switch (action.type) {
    case ADD_RESOURCE_DONE:
      return action.data;
    case FETCHING:
    case FETCH_FAILED:
      return null;
    default:
      return state;
  }
};
