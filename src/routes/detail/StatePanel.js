import React, { PropTypes } from 'react';
import TimeAgo from 'timeago-react';
import { getStateColor, getStateIcon } from '../common';
import weui from '../../components/Weui';

const StatePanel = ({ states, resId }) => {
  const { Panel, PanelHeader } = weui;
  return (
    <Panel>
      <div className="weui-panel__ft">
        <a href={`/add-state/${resId}`} className="weui-cell weui-cell_access weui-cell_link">
          <div className="weui-cell__bd">更新状态</div>
          <span className="weui-cell__ft" />
        </a>
      </div>
      <div className="weui-panel__bd">
        {
          states.map(state => {
            const backgroundColor = getStateColor(state.catagory);
            const icon = getStateIcon(state.catagory);
            return (
              <a href={`/state/${resId}/${state._id}`} className="weui-media-box weui-media-box_appmsg" style={{ backgroundColor }} key={state._id}>
                <div className="weui-media-box__hd">
                  <img className="weui-media-box__thumb" alt={state.creator.userId} src={`/avatars/${state.creator.userId}.png`} />
                </div>
                <div className="weui-media-box__bd">
                  <h4 className="weui-media-box__title">
                    {state.creator.userId} | <TimeAgo datetime={state.date} locale="zh_CN" />
                  </h4>
                  <p className="weui-media-box__desc">{state.note}</p>
                </div>
              </a>

            );
          })
        }
      </div>
    </Panel>
  );
};

export default StatePanel;
