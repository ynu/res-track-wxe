import React from 'react';
import AddState from './AddState';
import { addState } from '../../actions/add-state';

export default {

  path: '/add-state/:id',

  async action({ store, params: { id } }) {
    const add = async values => {
      try {
        await store.dispatch(addState(id, values.state));
        window.location = `/detail/${id}`;
      } catch (e) {
        console.log(e);
      }
    };
    return {
      title: '添加资源',
      component: (<AddState addState={add} resId={id} />),
    };
  },
};
