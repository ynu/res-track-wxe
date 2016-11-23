import { GET_RESOURCE_FETCHED } from '../constants';

export default (state = { states: [], currentState: { creator: {} } }, action) => {
  switch (action.type) {
    case GET_RESOURCE_FETCHED:
      return action.data;
    default:
      return state;
  }
};
