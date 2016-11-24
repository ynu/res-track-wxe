import React from 'react';
import { initialize } from 'redux-form';
import { SUCCESS, OTHER_ERROR } from 'nagu-validates';
import List from './List';
import fetch from '../../core/fetch';

const getResCatagories = async () => {
  try {
    const res = await fetch('/api/res-catagory');
    const result = await res.json();
    if (result.ret === SUCCESS) return result.data;
    else throw result;
  } catch (msg) {
    throw { ret: OTHER_ERROR, msg };
  }
};
export default {

  path: '/',

  async action({ query, store }) {
    const catagories = await getResCatagories();
    store.dispatch(initialize('listFilter', query));
    return {
      title: '资源列表',
      component: <List resCatagories={catagories} />,
    };
  },
};
