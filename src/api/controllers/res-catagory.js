/*
eslint-disable no-param-reassign, no-underscore-dangle
 */

import { Router } from 'express';
import { ObjectId } from 'mongodb';
import { SUCCESS, UNAUTHORIZED,
  OBJECT_ALREADY_EXISTS, SERVER_FAILED } from 'nagu-validates';
import { resCatagoryManager } from '../../config';
import * as auth from './wxe-auth-middlewares';

const router = new Router();

router.put('/',
  async (req, res) => {
    try {
      const catagoryId = await resCatagoryManager.add(req.body);
      res.send({ ret: SUCCESS, data: catagoryId });
    } catch (msg) {
      res.send({ ret: SERVER_FAILED, msg });
    }
  }
);

router.get('/',
  async (req, res) => {
    try {
      const data = await resCatagoryManager.find({});
      res.send({ ret: SUCCESS, data });
    } catch (msg) {
      res.send({ ret: SERVER_FAILED, msg });
    }
  }
);

router.delete('/:id',
  async (req, res) => {
    try {
      await resCatagoryManager.removeById(req.params.id);
      res.send({ ret: SUCCESS });
    } catch (msg) {
      res.send({ ret: SERVER_FAILED, msg });
    }
  }
);
export default router;
