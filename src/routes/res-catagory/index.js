import React from 'react';
import ResCatagory from './ResCatagory';

export default {

  path: '/res-catagory',

  async action() {
    return {
      title: '资源类别管理',
      component: <ResCatagory />,
    };
  },
};
