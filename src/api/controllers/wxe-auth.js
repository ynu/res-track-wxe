import { Router } from 'express';
import expressJwt from 'express-jwt';
import { SUCCESS, SERVER_FAILED } from 'nagu-validates';
import { signin, getme, getToken } from '../controllers/wxe-auth-middlewares';
import { host, auth } from '../../config';
import WxeApi from '../models/wxeapi-client';

const router = new Router();

router.get('/',
  signin({
    wxeApiOpitons: auth.wxent,
    getCallBackUrl: () => `http://${host}/api/wxe-auth/`,
  }),
);

// 获取当前登录用户信息
router.get('/me',
  expressJwt({
    secret: auth.jwt.secret,
    credentialsRequired: true,
    getToken,
  }),
  (req, res) => {
    res.send({ ret: SUCCESS, data: req.user });
  }
);

router.get('/jsconfig', async (req, res) => {
  const wxapi = new WxeApi(auth.wxent);
  try {
    const data = await wxapi.getJsConfig(req.query);
    res.send({ ret: SUCCESS, data });
  } catch (msg) {
    console.log(msg);
    res.send({ ret: SERVER_FAILED, msg });
  }
});

export default router;
