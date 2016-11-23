import React from 'react';
import Detail from './Detail';

export default {

  path: '/detail/:id',

  async action({ params }) {
    return {
      title: '详情',
      component: <Detail resId={params.id} />,
    };
  },
};
