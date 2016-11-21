import React, { PropTypes } from 'react';
import NeedSignup from '../../components/Auth/NeedSignup';
import fetch from '../../core/fetch';

const EnsureSignupWxe = () => {
  const redirectToLogin = () =>
    (window.location = `/api/wxe-auth?redirect_uri=${window.location.href}`);
  const getMe = async () => {
    let result;
    try {
      const res = await fetch('/api/wxe-auth/me', {
        credentials: 'same-origin',
      });
      result = await res.json();
    } catch (e) {
      // 服务器错误
      return { ret: 999, msg: e };
    }
    if (result.ret === 0) return result.data;
    throw result;
  };
  return (
    <NeedSignup
      fail={redirectToLogin}
      getMe={getMe}
    />
  );
};

export default EnsureSignupWxe;
