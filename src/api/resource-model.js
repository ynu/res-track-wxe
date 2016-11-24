/*
eslint-disable no-param-reassign
 */

import EntityManagerMongoDB from 'entity-manager';
import { REQUIRED, SERVER_FAILED, OBJECT_ALREADY_EXISTS } from 'nagu-validates';
import { ObjectId } from 'mongodb';

export default class ResourceManager extends EntityManagerMongoDB {
  // 添加资源
  async add(res, initState) {
    if (!res || !res.name || !res.catagory) {
      return Promise.reject({
        ret: REQUIRED,
        msg: 'name和catagory必须提供',
      });
    }
    const { name, catagory } = res;
    initState = {
      _id: new ObjectId(),
      date: new Date(),
      ...initState,
    };
    if (!initState.catagory || !initState.note || !initState.creator) {
      return Promise.reject({
        ret: REQUIRED,
        msg: '状态信息必须指定catagory、note和creator',
      });
    }
    if (!initState.date || !initState.date.getUTCDate) {
      initState.date = new Date();
    }
    const entity = {
      name,
      catagory,
      currentState: initState,
      statesLength: 1,
      states: [initState],
    };
    try {
      const existObj = await super.findOne({ name, catagory });
      if (existObj) {
        return Promise.reject({ ret: OBJECT_ALREADY_EXISTS, msg: '资源已经存在' });
      }
      const result = await super.insert(entity);
      return Promise.resolve(result.insertedId);
    } catch (msg) {
      return Promise.reject({ ret: SERVER_FAILED, msg });
    }
  }

  // 添加状态
  addState(resId, state) {
    if (!resId) return Promise.reject({ ret: REQUIRED, msg: '必须指定资源Id' });
    if (!state || !state.catagory || !state.note || !state.creator) {
      return Promise.reject({ ret: REQUIRED, msg: '状态信息不完整' });
    }
    const newState = {
      _id: new ObjectId(),
      date: new Date(),
      ...state,
    };
    return super.updateById(resId, {
      $addToSet: { states: newState },
      $inc: { statesLength: 1 },
      $set: {
        currentState: newState,
      },
    });
  }

  list({ catagory, state, before } = {}) {
    let query = {};
    if (catagory) {
      query = { ...query, catagory };
    }
    if (state) {
      query = { ...query, 'currentState.catagory': state };
    }
    if (before) {
      query = {
        ...query,
        states: { $elemMatch: { date: { $gte: before } } },
      };
    }
    console.log(query, catagory, state);
    return super.find({ query });
  }
}
