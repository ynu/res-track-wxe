import React from 'react';
import { SUCCESS, OTHER_ERROR } from 'nagu-validates';
import Stat from './Stat';
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

const getStat = async () => {
  try {
    const res = await fetch('/api/stat');
    const result = await res.json();
    if (result.ret === SUCCESS) return result.data;
    throw result;
  } catch (msg) {
    throw { ret: OTHER_ERROR, msg };
  }
};

export default {

  path: '/stat',

  async action() {
    const resCatagories = await getResCatagories();
    const stat = await getStat();
    return {
      title: '统计',
      component: <Stat resCatagories={resCatagories} stat={stat} />,
    };
  },
};
