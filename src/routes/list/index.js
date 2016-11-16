import React from 'react';
import List from './List';

export default {

  path: '/list',

  async action() {
    return {
      title: '资源列表',
      component: <List />,
    };
  },
};
