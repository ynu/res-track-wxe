/*
eslint-disable no-param-reassign, no-underscore-dangle
 */

import { Router } from 'express';
import expressJwt from 'express-jwt';
import { ObjectId } from 'mongodb';
import { SUCCESS, SERVER_FAILED } from 'nagu-validates';
import { resourceManager, auth } from '../../config';
import * as wxeAuth from '../controllers/wxe-auth-middlewares';
import { sendText } from './wxe-middlewares';

const router = new Router();

router.put('/',
  // 1. 检查用户是否登录
  expressJwt({
    secret: auth.jwt.secret,
    credentialsRequired: true,
    getToken: wxeAuth.getToken,
  }),
  // 2. 添加资源
  async (req, res) => {
    try {
      const initState = {
        ...req.body.state,
        creator: {
          userId: req.user.UserId,
        },
      };
      const resId = await resourceManager.add(req.body, initState);
      res.send({ ret: SUCCESS, data: resId });
    } catch (msg) {
      res.send({ ret: SERVER_FAILED, msg: msg.toString() });
    }
  },
);

router.get('/:resId/:stateId',
  async (req, res) => {
    const resource = await resourceManager.findById(new ObjectId(req.params.resId));
    const data = resource.states.find(state => (state._id.str === req.params.stateId));
    res.send({ ret: SUCCESS, data });
  }
);

router.get('/:id',
  expressJwt({
    secret: auth.jwt.secret,
    credentialsRequired: true,
    getToken: wxeAuth.getToken,
  }),
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
  expressJwt({
    secret: auth.jwt.secret,
    credentialsRequired: true,
    getToken: wxeAuth.getToken,
  }),
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
  expressJwt({
    secret: auth.jwt.secret,
    credentialsRequired: true,
    getToken: wxeAuth.getToken,
  }),
  async (req, res, next) => {
    console.log(req.body);
    const userId = req.user.UserId;
    const resId = req.params.id;
    const { catagory, note, files, sendTo } = req.body;
    try {
      const newState = {
        _id: new ObjectId(),
        catagory,
        note,
        files,
        creator: { userId },
        sendTo,
      };
      await resourceManager.addState(new ObjectId(resId), newState);

      if (sendTo) {
        req.newState = newState;
        next();
      } else res.send({ ret: SUCCESS, data: newState._id });
    } catch (msg) {
      res.send({ ret: SERVER_FAILED, msg });
    }
  },
  sendText(
    req => req.newState.sendTo,
    () => auth.wxent.agentId,
    () => '更新State成功',
    (req, res) => res.send({ ret: SUCCESS, data: req.newState._id }),
  ),
);

export default router;
