import { combineReducers } from 'redux';
import { SELECT_ENTERPRISE_CONTACT } from '../actions/wechat';

const selectdEnterpriseContact = (state = {
  departmentList: [],
  tagList: [],
  userList: [],
}, action) => {
  switch (action.type) {
    case SELECT_ENTERPRISE_CONTACT:
      return action.result;
    default:
      return state;
  }
};

export default combineReducers({
  selectdEnterpriseContact,
});
