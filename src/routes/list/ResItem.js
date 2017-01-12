import React, { PropTypes } from 'react';
import { getStateColor, getStateIcon, getCatagoryImage } from '../common';

const ResItem = ({ _id, catagory, currentState, name }) => {
  const backgroundColor = getStateColor(currentState.catagory);
  const icon = getStateIcon(currentState.catagory);

  return (
    <a className="weui-cell weui-cell_access" href={`/Detail/${_id}`} style={{ backgroundColor }} >
      <div className="weui-cell__hd">
        <img src={getCatagoryImage(catagory)} alt="" style={{ marginRight: '5px', display: 'block', width: '32px', height: '32px' }} />
      </div>
      <div className="weui-cell__bd weui-cell_primary">
        <p>{name}</p>
      </div>
      <span className="weui-cell__ft" />
    </a>
  );
};

export default ResItem;
