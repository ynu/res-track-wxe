/*
eslint-disable no-param-reassign, no-underscore-dangle
 */

import { Router } from 'express';
import { ObjectId } from 'mongodb';
import { SUCCESS, UNAUTHORIZED,
  OBJECT_ALREADY_EXISTS, SERVER_FAILED } from 'nagu-validates';
import { resourceManager } from '../config';
import * as auth from './controllers/wxe-auth-middlewares';

const tryRun = func => {
  try {
    return func();
  } catch (e) {
    return null;
  }
};

const getUserId = auth.getUserId(
  'userId',
  (userId, req, res, next) => {
    req.userId = userId;
    next();
  },
);

const router = new Router();

router.put('/',
  // 1. 检查用户是否登录
  getUserId,
  // 2. 添加资源
  async (req, res) => {
    try {
      const initState = {
        ...req.body.state,
        creator: {
          userId: req.userId,
        },
      };
      const resId = await resourceManager.add(req.body, initState);
      res.send({ ret: SUCCESS, data: resId });
    } catch (msg) {
      res.send({ ret: SERVER_FAILED, msg: msg.toString() });
    }
  },
);

router.get('/:id',
  getUserId,
  async (req, res) => {
    try {
      const data = await resourceManager.findById(new ObjectId(req.params.id));
      res.send({ ret: SUCCESS, data });
    } catch (msg) {
      res.send({ ret: SERVER_FAILED, msg });
    }
  },
);

// 获取列表
router.get('/',
  // auth.getUserId(),
  async (req, res) => {
    try {
      let { before } = req.query;
      if (before) {
        before = new Date(before);
      }
      const data = await resourceManager.list({
        ...req.query,
        before,
      });
      res.send({ ret: SUCCESS, data });
    } catch (msg) {
      res.send({ ret: SERVER_FAILED, msg });
    }
  },
);

router.put('/:id/state',
  getUserId,
  async (req, res) => {
    const userId = req.userId;
    const resId = req.params.id;
    const { catagory, note } = req.body;
    try {
      const _id = new ObjectId();
      await resourceManager.addState(new ObjectId(resId), {
        _id,
        catagory,
        note,
        creator: { userId },
      });
      res.send({ ret: SUCCESS, data: _id });
    } catch (msg) {
      res.send({ ret: SERVER_FAILED, msg });
    }
  },
);

export default router;
