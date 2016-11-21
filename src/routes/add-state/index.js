import { OTHER_ERROR, SUCCESS } from 'nagu-validates';
import React from 'react';
import AddState from './AddState';
import { addState } from '../../actions/add-state';
import fetch from '../../core/fetch';

const getRes = async id => {
  try {
    const res = await fetch(`/api/res-track/${id}`, {
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const result = await res.json();
    if (result.ret === SUCCESS) return Promise.resolve(result.data);
    return Promise.reject(result);
  } catch (msg) {
    console.log(msg);
    return Promise.reject({ ret: OTHER_ERROR, msg });
  }
};

export default {

  path: '/add-state/:id',

  async action({ store, params: { id } }) {
    const resource = await getRes(id);
    const add = async values => {
      try {
        const data = await store.dispatch(addState(id, values.state));
        window.location = `/detail/${id}`;
      } catch (e) {
        console.log(e);
      }
    };
    return {
      title: '添加资源',
      component: (<AddState
        addState={add} name={resource.name}
        currentState={resource.currentState}
      />),
    };
  },
};
