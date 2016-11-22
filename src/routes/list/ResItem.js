import React, { PropTypes } from 'react';
import { getStateColor, getStateIcon, getCatagoryImage } from '../common';

const ResItem = ({ _id, catagory, currentState, name }) => {
  const backgroundColor = getStateColor(catagory);
  const icon = getStateIcon(catagory);

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
