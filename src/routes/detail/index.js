import { OTHER_ERROR, SUCCESS } from 'nagu-validates';
import React from 'react';
import Detail from './Detail';
import fetch from '../../core/fetch';
// import { getResource } from ''
export default {

  path: '/detail/:id',

  async action({ params }) {
    let resource;
    let error;
    try {
      const res = await fetch(`/api/res-track/${params.id}`, {
        credentials: 'same-origin',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const result = await res.json();
      if (result.ret === SUCCESS) resource = result.data;
      else error = result;
    } catch (msg) {
      error = { ret: OTHER_ERROR, msg };
    }
    return {
      title: '详情',
      component: <Detail resource={resource} error={error} />,
    };
  },
};
