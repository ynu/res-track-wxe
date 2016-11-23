import { Router } from 'express';
import { signin, getme } from './controllers/wxe-auth-middlewares';
import { wxentConfig, host } from '../config';
const router = new Router();

const DEBUG = process.env.NODE_ENV === 'development';
router.get('/',
  signin({
    wxeApiOpitons: wxentConfig,
    getCallBackUrl: () => `http://${host}/api/wxe-auth/`,
  }),
);

// 获取当前登录用户信息
router.get('/me', getme());

export default router;
