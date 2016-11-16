import React from 'react';
import Add from './Add';
import { addResource } from '../../actions/add';

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
    return {
      title: '添加资源',
      component: <Add submitRes={add} />,
    };
  },
};
