import { SERVER_FAILED } from 'nagu-validates';
import { wxeapi } from '../../config';

export const sendText = (
  getReciever = () => null,
  getAgentId = () => null,
  getContent = () => null,
  success = (req, res, next) => next(),
  fail = (req, res) => res.send({ })
) => async (req, res, next) => {
  try {
    const to = getReciever(req, res);
    const agentid = getAgentId(req, res);
    const content = getContent(req, res);
    await wxeapi.sendText(to, agentid, content);
    success(req, res, next);
  } catch (msg) {
    fail({ ret: SERVER_FAILED, msg });
  }
};
