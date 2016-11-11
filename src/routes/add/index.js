import React from 'react';
import Add from './Add';

export default {

  path: '/add',

  async action() {
    return {
      title: '添加资源',
      component: <Add />,
    };
  },
};
