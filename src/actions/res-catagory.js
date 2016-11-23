import { OTHER_ERROR, SUCCESS } from 'nagu-validates';
import fetch from '../core/fetch';
import { fetchFailed, fetching, fetchDone } from './common';
import { RES_CATAGORIES_FETCHED, RES_CATAGORY_ADDED, RES_CATAGORY_REMOVED } from '../constants';

export const addResCatagory = catagory => async dispatch => {
  dispatch(fetching());
  try {
    const res = await fetch('/api/res-catagory', {
      credentials: 'same-origin',
      method: 'PUT',
      body: JSON.stringify(catagory),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const result = await res.json();
    if (result.ret === SUCCESS) {
      dispatch(fetchDone(result.data));
      dispatch({
        type: RES_CATAGORY_ADDED,
        data: catagory,
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

export const removeResCatagory = id => async dispatch => {
  dispatch(fetching());
  try {
    const res = await fetch(`/api/res-catagory/${id}`, {
      credentials: 'same-origin',
      method: 'DELETE',
    });
    const result = await res.json();
    if (result.ret === SUCCESS) {
      dispatch(fetchDone(result.data));
      dispatch({
        type: RES_CATAGORY_REMOVED,
        data: id,
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

export const listResCatagories = () => async dispatch => {
  dispatch(fetching());
  try {
    const res = await fetch('/api/res-catagory', {
      credentials: 'same-origin',
    });
    const result = await res.json();
    if (result.ret === SUCCESS) {
      dispatch(fetchDone(result.data));
      dispatch({
        type: RES_CATAGORIES_FETCHED,
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
  addResCatagory,
};
