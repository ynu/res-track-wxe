import fetch from 'node-fetch';
import crypto from 'crypto';

const qyapiPrefix = 'https://qyapi.weixin.qq.com/cgi-bin';
const userPrefix = `${qyapiPrefix}/user`;

/*!
 * 生成随机字符串
 */
const createNonceStr = () => Math.random().toString(36).substr(2, 15);

/*!
 * 生成时间戳
 */
const createTimestamp = () => parseInt(new Date().getTime() / 1000, 10);

class WxeApi {
  constructor(options) {
    options = { // eslint-disable-line no-param-reassign
      expire: 7000,
      getToken: async () => Promise.resolve(null),
      setToken: async () => Promise.resolve(),
      ...options,
    };
    this.corpId = options.corpId;
    this.secret = options.secret;
    this.getLocalToken = options.getToken;
    this.setToken = options.setToken;
    // this.getLocalToken = async () =>
    //   new Promise((resolve, reject) => {
    //     redisClient.get(`${wxentConfig.corpId}.expire`, (err, date) => {
    //       console.log('##########', 'start to get token');
    //       console.log('####', date);
    //       const now = Date.now();
    //       if (err) {
    //         reject(err);
    //       } else if (date && date - now > 0) {
    //         redisClient.get(`${wxentConfig.corpId}.token`, (err2, token) => {
    //           if (err2) {
    //             reject(err2);
    //           } else {
    //             resolve(token);
    //           }
    //         });
    //       } else resolve(null);
    //     });
    //   });
    // this.setToken = async token =>
    //   new Promise((resolve, reject) => {
    //     if (!Number.isInteger(expire)) {
    //       reject('expire is not valid');
    //       return;
    //     }
    //     const now = +Date.now();
    //     redisClient.set(`${wxentConfig.corpId}.expire`, now + (expire * 1000));
    //     redisClient.set(`${wxentConfig.corpId}.token`, JSON.stringify(token));
    //     resolve();
    //   });
  }

  /*!
 * 排序查询字符串
 */
  static raw(args) {
    let keys = Object.keys(args);
    keys = keys.sort();
    const newArgs = {};
    keys.forEach((key) => {
      newArgs[key.toLowerCase()] = args[key];
    });

    let string = '';
    for (const k in newArgs) {
      string += `&${k}=${newArgs[k]}`;
    }
    return string.substr(1);
  }

  static sign(nonceStr, jsapiTicket, timestamp, url) {
    const string = `jsapi_ticket=${jsapiTicket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${url}`;
    const shasum = crypto.createHash('sha1');
    shasum.update(string);
    return shasum.digest('hex');
  }

  static signGroupTicket(nonceStr, groupTicket, timestamp, url) {
    const string = `group_ticket=${groupTicket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${url}`;
    const shasum = crypto.createHash('sha1');
    shasum.update(string);
    return shasum.digest('hex');
  }

  // http://qydev.weixin.qq.com/wiki/index.php?title=OAuth%E9%AA%8C%E8%AF%81%E6%8E%A5%E5%8F%A3
  getAuthorizeURL(redirectUri, state) {
    const host = 'https://open.weixin.qq.com/connect/oauth2';
    return `${host}/authorize?appid=${this.corpId}&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_base&state=${state}#wechat_redirect`;
  }

  async getToken() {
    try {
      const localToken = await this.getLocalToken();
      if (localToken) return localToken;

      const res = await fetch(`https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=${this.corpId}&corpsecret=${this.secret}`);
      const result = await res.json();
      await this.setToken(result.access_token);
      return result.access_token;
    } catch (e) {
      throw e;
    }
  }

  // http://qydev.weixin.qq.com/wiki/index.php?title=OAuth%E9%AA%8C%E8%AF%81%E6%8E%A5%E5%8F%A3
  async getUserIdByCode(code) {
    let result;
    try {
      const token = await this.getToken();
      const res = await fetch(`${userPrefix}/getuserinfo?access_token=${token}&code=${code}`);
      result = await res.json();
    } catch (e) {
      throw e;
    }
    if (result.errcode) throw result;
    return result;
  }

  // http://qydev.weixin.qq.com/wiki/index.php?title=%E7%AE%A1%E7%90%86%E6%88%90%E5%91%98
  async getUser(userid) {
    let result;
    try {
      const token = await this.getToken();
      const res = await fetch(`${userPrefix}/get?access_token=${token}&userid=${userid}`);
      result = await res.json();
    } catch (e) {
      throw e;
    }
    if (result.errcode) throw result;
    return result;
  }

  // http://qydev.weixin.qq.com/wiki/index.php?title=%E5%BE%AE%E4%BF%A1JS-SDK%E6%8E%A5%E5%8F%A3#.E9.99.84.E5.BD.951-JS-SDK.E4.BD.BF.E7.94.A8.E6.9D.83.E9.99.90.E7.AD.BE.E5.90.8D.E7.AE.97.E6.B3.95
  async getJsApiTicket() {
    let result;
    try {
      const token = await this.getToken();
      const res = await fetch(`${qyapiPrefix}/get_jsapi_ticket?access_token=${token}`);
      result = await res.json();
    } catch (e) {
      throw e;
    }
    if (result.errcode) throw result;
    return result;
  }

  // http://qydev.weixin.qq.com/wiki/index.php?title=%E5%BE%AE%E4%BF%A1JS-SDK%E6%8E%A5%E5%8F%A3#.E6.AD.A5.E9.AA.A4.E4.BA.8C.EF.BC.9A.E9.80.9A.E8.BF.87config.E6.8E.A5.E5.8F.A3.E6.B3.A8.E5.85.A5.E6.9D.83.E9.99.90.E9.AA.8C.E8.AF.81.E9.85.8D.E7.BD.AE
  async getJsConfig({ debug, jsApiList, url }) {
    const nonceStr = createNonceStr();
    const jsApiTicket = await this.getJsApiTicket();
    const timestamp = createTimestamp();
    const signature = WxeApi.sign(nonceStr, jsApiTicket.ticket, timestamp, url);
    return {
      debug,
      appId: this.corpId,
      timestamp,
      nonceStr,
      signature,
      jsApiList,
    };
  }

  /**
   * 创建企业号管理组配置信息，wx.openEnterpriseContact接口使用
   */
  async getGroupConfig(url) {
    const { ticket, group_id } = await this.getContactTicket();
    const timestamp = createTimestamp();
    const nonceStr = createNonceStr();
    const signature = WxeApi.signGroupTicket(nonceStr, ticket, timestamp, url);
    return {
      groupId: group_id,
      timestamp: `${timestamp}`,
      nonceStr,
      signature,
    };
  }

  /**
   * 获取管理组JS-SDK凭据
   * http://qydev.weixin.qq.com/wiki/index.php?title=%E5%BE%AE%E4%BF%A1JS-SDK%E6%8E%A5%E5%8F%A3#.E9.99.84.E5.BD.952-.E4.BC.81.E4.B8.9A.E5.8F.B7.E7.AE.A1.E7.90.86.E7.BB.84.E6.9D.83.E9.99.90.E9.AA.8C.E8.AF.81.E6.96.B9.E6.B3.95
   */
  async getContactTicket() {
    let result;
    try {
      const token = await this.getToken();
      const res = await fetch(`${qyapiPrefix}/ticket/get?access_token=${token}&type=contact`);
      result = await res.json();
    } catch (e) {
      throw e;
    }
    if (result.errcode) throw result;
    return result;
  }

  async sendMessage(to, message) {
    let body = {
      ...message,
    };
    if (to.touser) {
      body = {
        ...body,
        touser: Array.isArray(to.touser) ? to.touser.join('|') : to.touser,
      };
    }
    if (to.topary) {
      body = {
        ...body,
        toparty: Array.isArray(to.toparty) ? to.toparty.join('|') : to.toparty,
      };
    }
    if (to.totag) {
      body = {
        ...body,
        totag: Array.isArray(to.totag) ? to.totag.join('|') : to.totag,
      };
    }
    let result;
    console.log(JSON.stringify(body));
    try {
      const token = await this.getToken();
      console.log(token);
      const res = await fetch(`${qyapiPrefix}/message/send?access_token=${token}`, {
        method: 'POST',
        body: JSON.stringify(body),
      });
      result = await res.json();
    } catch (e) {
      throw e;
    }
    if (result.errcode) throw result;
    return result;
  }

  sendText(to, agentid, content) {
    return this.sendMessage(to, {
      agentid,
      msgtype: 'text',
      text: {
        content,
      },
    });
  }

  sendNews(to, agentid, articles) {
    return this.sendMessage(to, {
      agentid,
      msgtype: 'news',
      news: { articles },
    });
  }

  sendTextCard(to, agentid, textcard) {
    return this.sendMessage(to, {
      agentid,
      msgtype: 'textcard',
      textcard,
    });
  }
}

// export const getToken = async (key = 'wechat-access-token') =>
//   new Promise((resolve, reject) => {
//     redisClient.get(`${key}.expire`, (err, date) => {
//       console.log('##########', 'start to get token');
//       console.log('####', date);
//       const now = Date.now();
//       if (err) {
//         reject(err);
//       } else if (date && date - now > 0) {
//         redisClient.get(`${key}.token`, (err2, token) => {
//           if (err2) {
//             reject(err2);
//           } else {
//             resolve(token);
//           }
//         });
//       } else resolve(null);
//     });
//   });

export default WxeApi;
