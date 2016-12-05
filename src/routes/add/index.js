import React from 'react';
import { SUCCESS, OTHER_ERROR } from 'nagu-validates';
import Add from './Add';
import { addResource } from '../../actions/add';
import fetch from '../../core/fetch';

const getResCatagories = async () => {
  try {
    const res = await fetch('/api/res-catagory');
    const result = await res.json();
    if (result.ret === SUCCESS) return result.data;
    throw result;
  } catch (msg) {
    throw { ret: OTHER_ERROR, msg };
  }
};

export default {

  path: '/add',

  async action({ store }) {
    const add = async values => {
      try {
        const data = await store.dispatch(addResource(values));
        window.location = `/detail/${data}`;
      } catch (e) {
        console.log(e);
      }
    };
    const catagories = await getResCatagories();
    return {
      title: '添加资源',
      component: <Add submitRes={add} resCatagories={catagories} />,
    };
  },
};
