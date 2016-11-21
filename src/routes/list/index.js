import React from 'react';
import { change, initialize } from 'redux-form';
import List from './List';

export default {

  path: '/',

  async action({ query, store }) {
    store.dispatch(initialize('listFilter', query));
    return {
      title: '资源列表',
      component: <List />,
    };
  },
};
