import React, { PropTypes } from 'react';
import TimeAgo from 'timeago-react';

const StatePanel = ({ catagory, creator, date, note }) => {
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
    <div className="weui-panel" style={{ backgroundColor }} key={date}>
      <div className="weui-panel__bd">
        <div className="weui-media-box weui-media-box_text">
          <h4 className="weui-media-box__title">
            <i className={icon} />
            {creator}
          </h4>
          <p className="weui-media-box__desc">{note}</p>
          <ul className="weui-media-box__info">
            <li className="weui-media-box__info__meta">
              <TimeAgo datetime={date} locale="zh_CN" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StatePanel;
