import { OTHER_ERROR, SUCCESS } from 'nagu-validates';
import fetch from '../core/fetch';
import { fetchFailed, fetching, fetchDone } from './common';
import { GET_RESOURCE_FETCHED } from '../constants';

export const getResource = resId => async dispatch => {
  dispatch(fetching());
  try {
    const res = await fetch(`/api/res-track/${resId}`, {
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const result = await res.json();
    if (result.ret === SUCCESS) {
      dispatch(fetchDone);
      dispatch({
        type: GET_RESOURCE_FETCHED,
        data: result.data,
      });
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

export default {
  getResource,
};
