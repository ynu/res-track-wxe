import React, { PropTypes } from 'react';
import TimeAgo from 'timeago-react';
import { getStateColor, getStateIcon } from '../common';
import Avatar from './Avatar';

const PageHeader = ({ name, catagory, note, creator, date }) => {
  const backgroundColor = getStateColor(catagory);

  return (
    <div className="page__hd" style={{ backgroundColor }} >
      <h1 className="page__title">{name}</h1>
      <p className="page__desc">
        {note}
        <br />
        <TimeAgo datetime={date} locale="zh_CN" />
      </p>
    </div>
  );
};

export default PageHeader;
