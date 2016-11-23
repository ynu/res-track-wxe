import { combineReducers } from 'redux';
import { SHOW_CONFIRM, HIDE_CONFIRM } from '../actions/weui';

export default (state = {}, action) => {
  switch (action.type) {
    case SHOW_CONFIRM:
      return {
        show: true,
        ...action.data,
      };
    case HIDE_CONFIRM:
      return {
        show: false,
      };
    default:
      return state;
  }
};
