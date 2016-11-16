/*
eslint-disable no-param-reassign
 */

import { Router } from 'express';
import { ObjectId } from 'mongodb';
import * as auth from 'wxe-auth-express';
import { SUCCESS, UNAUTHORIZED,
  OBJECT_ALREADY_EXISTS, SERVER_FAILED } from 'nagu-validates';
import { resourceManager } from '../config';

const tryRun = func => {
  try {
    return func();
  } catch (e) {
    return null;
  }
};

// 获取当前用户的Id
const getId = req => req.user.userid;

const router = new Router();

router.put('/',
  // 1. 检查用户是否登录
  // auth.getUserId(),
  // 2. 添加资源
  async (req, res) => {
    const { name, catagory } = req.body;
    try {
      const resId = await resourceManager.add({
        name,
        catagory,
      });
      res.send({ ret: SUCCESS, data: resId });
    } catch (msg) {
      res.send({ ret: SERVER_FAILED, msg });
    }
  },
);

router.get('/:id',
  // auth.getUserId(),
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
      const data = await resourceManager.find();
      res.send({ ret: SUCCESS, data });
    } catch (msg) {
      res.send({ ret: SERVER_FAILED, msg });
    }
  },
);

router.put('/:id/state',
  // auth.getUserId(),
  (req, res, next) => {
    req.user = { userid: 'test' };
    next();
  },
  async (req, res) => {
    const creator = req.user.userid;
    const resId = req.params.id;
    const { catagory, note } = req.body;
    try {
      await resourceManager.addState(new ObjectId(resId), {
        catagory,
        note,
        creator,
      });
      res.send({ ret: SUCCESS });
    } catch (msg) {
      res.send({ ret: SERVER_FAILED, msg });
    }
  },
);

export default router;
