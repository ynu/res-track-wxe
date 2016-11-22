import fetch from 'node-fetch';

const qyapiPrefix = 'https://qyapi.weixin.qq.com/cgi-bin';
const userPrefix = `${qyapiPrefix}/user`;

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
