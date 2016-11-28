import { Router } from 'express';
import fetch from 'node-fetch';
import { createWriteStream, statSync, mkdir } from 'fs';
import path from 'path';
import { wxeapi } from '../../config';

const router = new Router();

const renderAvatarImage = (
  getUserId = () => null,
  getImageFileName = () => null,
) => async (req, res, next) => {
  try {
    const userId = getUserId(req, res);
    // 从微信企业号获取用户头像
    const user = await wxeapi.getUser(userId);
    const res2 = await fetch(`${user.avatar}64`);

    // 将头像存到本地
    const filename = getImageFileName(req, res);
    const dest = createWriteStream(filename);
    res2.body.pipe(dest);
    dest.on('close', () => next());

    // 发送头像回客户端
    // res.end(await res2.buffer());
  } catch (e) {
    // 出错时应当返回默认头像
  }
  // next();
};
// 确保文件有效（存在，且时间(秒)还在有效期）
const ensureFileValid = (
  getPath = () => null,
  expire,
  success = (req, res, next) => next(),
  fail = (req, res) => res.send({ ret: -1 }),
) => async (req, res, next) => {
  try {
    const filename = getPath(req, res);
    const stat = statSync(filename);
    const now = Date.now();
    if (now - +stat.mtime > expire) throw new Error('expired');
    await success(req, res, next);
  } catch (e) {
    console.log(JSON.stringify(e));
    fail(req, res, next);
  }
};

// 发送本地头像到客户端
const sendLocalFile = (
  getPath = () => null,
  defaultPath,
) => async (req, res) => {
  const filename = getPath(req, res) || defaultPath;
  try {
    // 确保filename存在
    statSync(filename);
    res.sendFile(filename);
  } catch (e) {
    res.sendFile(defaultPath);
  }
};

// 根据用户Id获取用户头像
router.get('/:id',
  (req, res, next) => {
    try {
      statSync(path.resolve(__dirname, 'public/avatars/'));
    } catch (e) {
      mkdir(path.resolve(__dirname, 'public/avatars/'));
    }
    next();
  },
  renderAvatarImage(
    req => req.params.id.replace('.png', ''),
    req => path.resolve(__dirname, `public/avatars/${req.params.id}`),
  ),
  sendLocalFile(
    // 本地头像路径
    req => path.resolve(__dirname, `public/avatars/${req.params.id}`),
    path.resolve(__dirname, 'public/tile.png'),
  ),
);

export default router;
