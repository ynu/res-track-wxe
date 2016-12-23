import EntityManagerMongoDB from 'entity-manager';
import { REQUIRED, SERVER_FAILED } from 'nagu-validates';

export default class ResCatagoryManager extends EntityManagerMongoDB {
  // 添加资源类别
  async add(resCatagory) {
    // 字段： _id, title, imageUrl
    if (!resCatagory || !resCatagory._id || !resCatagory.title) {
      return Promise.reject({
        ret: REQUIRED,
        msg: 'ID和title不能为空',
      });
    }
    return this.insert(resCatagory);
  }
}
