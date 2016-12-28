import React, { PropTypes } from 'react';

class WxSelectUser extends React.Component {
  static async getGroupConfig() {
    const url = encodeURIComponent(window.location.href.split('#')[0]);
    const res = await fetch(`/api/wxe-auth/groupConfig?url=${url}`);
    const result = await res.json();
    return result.data;
  }
  static getInvoker(funcName, args, cb) {
    const evalWXjsApi = (jsApiFun) => {
      if (typeof WeixinJSBridge === 'object' && typeof WeixinJSBridge.invoke === 'function') {
        jsApiFun();
      } else {
        document.attachEvent && document.attachEvent('WeixinJSBridgeReady', jsApiFun);
        document.addEventListener && document.addEventListener('WeixinJSBridgeReady', jsApiFun);
      }
    };
    return () => evalWXjsApi(() => WeixinJSBridge.invoke(funcName, args, cb));
  }
  static defaultProps = {
    mode: 'multi',
    selectedUserIds: [],
  };
  async componentDidMount() {
    const { selectedUserIds, mode, onFinish, bind } = this.props;
    const groupConfig = await WxSelectUser.getGroupConfig();
    wx.ready(async () => {
      const invoke = WxSelectUser.getInvoker(
        'openEnterpriseContact',
        {
          ...groupConfig,
          params: {
            departmentIds: [0],    // 非必填，可选部门ID列表（如果ID为0，表示可选管理组权限下所有部门）
            mode,    // 必填，选择模式，single表示单选，multi表示多选
            type: ['user'],    // 必填，选择限制类型，指定department、tag、user中的一个或者多个
            selectedUserIds,
          },
        },
        res => {
          if (!res) return;
          if (res.err_msg.indexOf('function_not_exist') > -1) {
            alert('版本过低请升级');
          } else if (res.err_msg.indexOf('openEnterpriseContact:fail') > -1) {
            alert(JSON.stringify(res));
            return;
          }
          const result = JSON.parse(res.result);    // 返回字符串，开发者需自行调用JSON.parse解析
          // if (result.selectAll) {
          //   alert('系统暂不支持选择全部，请重新选择');
          //   return;
          // }
          onFinish(result);
        }
      );
      bind(invoke);
    });
  }
  render() {
    return null;
  }
}

export default WxSelectUser;
