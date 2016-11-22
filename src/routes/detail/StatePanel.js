import React, { PropTypes } from 'react';
import TimeAgo from 'timeago-react';
import { getStateColor, getStateIcon } from '../common';

const StatePanel = ({ catagory, creator, date, note }) => {
  const backgroundColor = getStateColor(catagory);
  const icon = getStateIcon(catagory);

  return (
    <div className="weui-panel" style={{ backgroundColor }} key={date}>
      <div className="weui-panel__bd">
        <div className="weui-media-box weui-media-box_text">
          <h4 className="weui-media-box__title">
            <img alt={creator.userId} src={`/api/avatar/${creator.userId}`} style={{ marginRight: '5px', width: '32px', height: '32px' }} />
            {creator.userId}
          </h4>
          <p className="weui-media-box__desc">
            <i className={icon} />
            {note}
          </p>
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
