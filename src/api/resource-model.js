import EntityManagerMongoDB from 'entity-manager';
import { REQUIRED, SERVER_FAILED, OBJECT_ALREADY_EXISTS } from 'nagu-validates';

export default class ResourceManager extends EntityManagerMongoDB {
  // 添加资源
  async add(res) {
    if (!res || !res.name || !res.catagory) {
      return Promise.reject({
        ret: REQUIRED,
        msg: 'name和catagory必须提供',
      });
    }
    const { name, catagory } = res;
    const initState = {
      catagory: 'success',
      note: '资源初始化成功',
      creator: 'system',
      date: new Date(),
    };
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
    if (!resId) return Promise.reject({ ret: REQUIRED, msg: '必须制定资源Id' });
    if (!state || !state.catagory || !state.note || !state.creator) {
      return Promise.reject({ ret: REQUIRED, msg: '状态信息不完全' });
    }
    return super.updateById(resId, {
      $addToSet: {
        states: {
          ...state,
          date: new Date(),
        },
      },
      $inc: { statesLength: 1 },
      $set: {
        currentState: { ...state, date: new Date() },
      },
    });
  }
}
