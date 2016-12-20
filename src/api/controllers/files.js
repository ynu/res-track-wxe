/*
eslint-disable no-param-reassign, no-underscore-dangle
 */

import { Router } from 'express';
import expressJwt from 'express-jwt';
import { ObjectId } from 'mongodb';
import { SUCCESS, SERVER_FAILED } from 'nagu-validates';
import multer from 'multer';
import path from 'path';
import imageType from 'image-type';
import { resourceManager, auth, fileManager } from '../../config';
import * as wxeAuth from '../controllers/wxe-auth-middlewares';

const router = new Router();

const upload = multer({ storage: multer.memoryStorage() });
router.put('/',
  expressJwt({
    secret: auth.jwt.secret,
    credentialsRequired: true,
    getToken: wxeAuth.getToken,
  }),
  upload.single('file'),
  async (req, res) => {
    // 将文件信息保存到数据库中
    const fileId = new ObjectId();
    try {
      await fileManager.writeFile(req.file.buffer, fileId, req.file.originalname);
      res.send({ ret: 0, data: fileId });
    } catch (e) {
      res.send({ ret: SERVER_FAILED, msg: e });
    }
  }
);

router.get('/:fileId',
  async (req, res) => {
    const fileBuffer = await fileManager.readFile(new ObjectId(req.params.fileId));
    const fileInfo = imageType(fileBuffer);
    res.set('Content-Type', fileInfo.mime);
    res.send(fileBuffer);
  }
);

router.delete('/:fileId',
  async (req, res) => {
    const { fileId } = req.params;
    try {
      await fileManager.removeFile(fileId);
      res.send({ ret: SUCCESS });
    } catch (e) {
      res.send({ ret: SERVER_FAILED, msg: e });
    }
  }
);


export default router;
