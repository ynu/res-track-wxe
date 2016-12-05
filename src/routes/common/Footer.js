import React from 'react';

const Footer = () => (
  <div className="weui-footer" style={{ marginTop: '10px' }}>
    <p className="weui-footer__links">
      <a href="http://www.itc.ynu.edu.cn" className="weui-footer__link">信息技术中心</a>
      <a href="https://github.com/ynu/res-track-wxe/" className="weui-footer__link">Github</a>
    </p>
    <p className="weui-footer__text">Copyright © 2016-{(new Date()).getFullYear()} 云南大学</p>
  </div>
  );

export default Footer;
