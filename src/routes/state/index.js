import React from 'react';
import State from './State';

export default {

  path: '/state/:resId/:stateId',

  async action({ params }) {
    return {
      title: '状态详情',
      component: <State {...params} />,
    };
  },
};
