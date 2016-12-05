import { Router } from 'express';
import expressJwt from 'express-jwt';
import { SUCCESS } from 'nagu-validates';
import { signin, getme, getToken } from '../controllers/wxe-auth-middlewares';
import { host, auth } from '../../config';

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

export default router;
