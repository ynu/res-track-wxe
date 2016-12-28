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
import fs from 'fs';
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
  // 确保文件夹存在
  (req, res, next) => {
    try {
      fs.statSync(path.resolve(__dirname, 'public/files/'));
    } catch (e) {
      fs.mkdir(path.resolve(__dirname, 'public/files/'));
    }
    next();
  },
  async (req, res) => {
    const { fileId } = req.params;
    const fileBuffer = await fileManager.readFile(new ObjectId(fileId));
    const fileInfo = imageType(fileBuffer);

    // 将数据保存到文件中
    const fd = fs.openSync(path.resolve(__dirname, `public/files/${fileId}`), 'w+');
    fs.write(fd, fileBuffer);

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
