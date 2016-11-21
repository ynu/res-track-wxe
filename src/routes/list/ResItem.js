import React, { PropTypes } from 'react';
import { getCatagoryImage } from '../common';

const ResItem = ({ _id, catagory, currentState, name }) => {
  let backgroundColor;
  let icon;
  switch (currentState.catagory) {
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
    <a className="weui-cell weui-cell_access" href={`/Detail/${_id}`} style={{ backgroundColor }} >
      <div className="weui-cell__hd">
        <img src={getCatagoryImage(catagory)} alt="" style={{ marginRight: '5px', display: 'block' }} />
      </div>
      <div className="weui-cell__bd weui-cell_primary">
        <p>{name}</p>
      </div>
      <span className="weui-cell__ft"></span>
    </a>
  );
};

export default ResItem;
