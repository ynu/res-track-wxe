import React, { PropTypes } from 'react';

const Avatar = ({ userId }) => {
  if (!userId) return null;
  return (
    <img alt={userId} src={`/api/avatar/${userId}`} style={{ marginRight: '5px', width: '32px', height: '32px' }} />
  );
};

export default Avatar;
