/*
eslint-disable no-param-reassign, no-underscore-dangle, no-plusplus
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
    return super.find({ query });
  }

  async sumStatesLength() {
    try {
      const result = await super.aggregate([{
        $project: { statesLength: 1 },
      }, {
        $group: {
          _id: 'sum',
          value: { $sum: '$statesLength' },
        },
      }]);
      return result[0].value;
    } catch (e) {
      throw e;
    }
  }

  async countByCatagory() {
    try {
      const reducer = (obj, prev) => (prev.count++);
      const result = await super.group(['catagory'], {}, { count: 0 }, reducer);
      return result.map(row => ({ [row.catagory]: row.count }))
        .reduce((prev, obj) => ({ ...prev, ...obj }), {});
    } catch (e) {
      throw e;
    }
  }

  async countByCurrentState() {
    try {
      const reducer = (obj, prev) => (prev.count++);
      const result = await super.group(['currentState.catagory'], {}, { count: 0 }, reducer);
      return result.map(row => ({ [row['currentState.catagory']]: row.count }))
        .reduce((prev, obj) => ({ ...prev, ...obj }), {});
    } catch (e) {
      throw e;
    }
  }

  countBeforeDate(date) {
    const condition = {
      'currentState.date': {
        $lt: date,
      },
    };
    return super.count(condition);
  }
}
