import { SERVER_FAILED } from 'nagu-validates';
import { wxeapi } from '../../config';

export const sendText = (
  getReciever = () => null,
  getAgentId = () => null,
  getContent = async () => null,
  success = (result, req, res, next) => next(),
  fail = (err, req, res) => res.send(err)
) => async (req, res, next) => {
  try {
    const to = getReciever(req, res);
    const agentid = getAgentId(req, res);
    const content = await getContent(req, res);
    const result = await wxeapi.sendText(to, agentid, content);
    if (result.errcode === 0) success(result, req, res, next);
    else fail(result, req, res, next);
  } catch (msg) {
    fail({ ret: SERVER_FAILED, msg }, req, res, next);
  }
};

export const sendNews = (
  getReciever = () => null,
  getAgentId = () => null,
  getArticles = async () => [],
  success = (result, req, res, next) => next(),
  fail = (err, req, res) => res.send(err)
) => async (req, res, next) => {
  try {
    const to = getReciever(req, res);
    const agentid = getAgentId(req, res);
    const articles = await getArticles(req, res);
    const result = await wxeapi.sendNews(to, agentid, articles);
    if (result.errcode === 0) success(result, req, res, next);
    else fail(result, req, res, next);
  } catch (msg) {
    fail({ ret: SERVER_FAILED, msg }, req, res, next);
  }
};
