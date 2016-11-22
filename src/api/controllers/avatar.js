import { Router } from 'express';
import fetch from 'node-fetch';
import { createWriteStream, statSync } from 'fs';
import path from 'path';
import { wxeapi } from '../../config';

const router = new Router();

// 确保文件有效（存在，且时间(秒)还在有效期）
const ensureFileValid = (
  getPath = () => null,
  expire,
  success = (req, res, next) => next(),
  fail = (req, res) => res.send({ ret: -1 }),
) => async (req, res, next) => {
  try {
    const filename = getPath();
    const stat = statSync(filename);
    const now = Date.now();
    if (now - +stat.mtime > expire) throw new Error('expired');
    await success(req, res, next);
  } catch (e) {
    fail(req, res, next);
  }
};

// 发送本地头像到客户端
const sendLocalFile = (
  getPath = () => null,
  defaultPath,
) => async (req, res) => {
  const filename = getPath(req, res) || defaultPath;
  res.sendFile(filename);
};

// 根据用户Id获取用户头像
router.get('/:id',
  // 确保头像文件存在
  ensureFileValid(
    // 本地头像路径
    req => path.resolve(__dirname, `./${req.params.id}.png`),
    // 头像过期时间（秒），为避免同时大量从微信企业号读取头像，设置一个随机值。
    (3600 * 24) + Math.round(Math.random(7200)),
    // 成功时进行下一步，
    (req, res, next) => next(),

    // 失败时，重新生成头像文件
    async (req, res) => {
      try {
        // 从微信企业号获取用户头像
        const user = await wxeapi.getUser(req.params.id);
        const res2 = await fetch(`${user.avatar}64`);

        // 将头像存到本地
        const dest = createWriteStream(path.resolve(__dirname, `./${req.params.id}.png`));
        res2.body.pipe(dest);

        // 发送头像回客户端
        res.end(await res2.buffer());
      } catch (e) {
        // 出错时应当返回默认头像
      }
    }
  ),
  sendLocalFile(
    // 本地头像路径
    req => path.resolve(__dirname, `./${req.params.id}.png`),
  ),
);

export default router;
