import React, { PropTypes } from 'react';
import TimeAgo from 'timeago-react';
import { getStateColor, getStateIcon } from '../common';
import Avatar from './Avatar';

const PageHeader = ({ name, catagory, note, creator, date }) => {
  const backgroundColor = getStateColor(catagory);
  const icon = getStateIcon(catagory);

  return (
    <div className="page__hd" style={{ backgroundColor }} >
      <h1 className="page__title"><i className={icon} />{name}</h1>
      <p className="page__desc">
        {note}
        &nbsp;|
        <Avatar {...creator} />
        {creator.userId}
        &nbsp;| <TimeAgo datetime={date} locale="zh_CN" />
      </p>
    </div>
  );
};

export default PageHeader;
