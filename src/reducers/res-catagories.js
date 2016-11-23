import { RES_CATAGORIES_FETCHED, RES_CATAGORY_ADDED, RES_CATAGORY_REMOVED } from '../constants';

export default (state = [], action) => {
  switch (action.type) {
    case RES_CATAGORIES_FETCHED:
      return action.data;
    case RES_CATAGORY_ADDED:
      return [
        ...state,
        action.data,
      ];
    case RES_CATAGORY_REMOVED:
      return state.filter(catagory => catagory._id !== action.data);
    default:
      return state;
  }
};
