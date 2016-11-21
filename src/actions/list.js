import { OTHER_ERROR, SUCCESS } from 'nagu-validates';
import fetch from '../core/fetch';
import { fetchFailed, fetching, fetchDone } from './common';
import { SET_LIST_PARAMS } from '../constants';

export const findResources = ({ catagory, state, before }) => async dispatch => {
  dispatch(fetching());
  try {
    const res = await fetch(
      `/api/res-track?catagory=${catagory || ''}&state=${state || ''}&before=${before || ''}`, {
        credentials: 'same-origin',
      });
    const result = await res.json();
    if (result.ret === SUCCESS) {
      dispatch(fetchDone(result.data));
      return Promise.resolve(result.data);
    }
    dispatch(fetchFailed(result));
    return Promise.reject(result);
  } catch (msg) {
    const result = {
      ret: OTHER_ERROR,
      msg,
    };
    dispatch(fetchFailed(result));
    return Promise.reject(result);
  }
};

export const setParams = params => ({
  type: SET_LIST_PARAMS,
  params,
});
