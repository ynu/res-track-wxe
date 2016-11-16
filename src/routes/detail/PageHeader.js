import React, { PropTypes } from 'react';
import TimeAgo from 'timeago-react';

const PageHeader = ({ name, catagory, note, creator, date }) => {
  let backgroundColor;
  let icon;
  switch (catagory) {
    case 'success':
      backgroundColor = '#dff0d8';
      icon = 'weui-icon-success';
      break;
    case 'warning':
      backgroundColor = '#faebcc';
      icon = 'weui-icon-warn';
      break;
    case 'error':
      backgroundColor = '#f2dede';
      icon = 'weui-icon-cancel';
      break;
    default:
      backgroundColor = '#000000';
      icon = 'weui-icon-info-circle';
  }
  return (
    <div className="page__hd" style={{ backgroundColor }} >
      <h1 className="page__title"><i className={icon} />{name}</h1>
      <p className="page__desc">
        {note}
        &nbsp;| {creator}
        &nbsp;| <TimeAgo datetime={date} locale="zh_CN" />
      </p>
    </div>
  );
};

export default PageHeader;
