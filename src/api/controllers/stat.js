import { Router } from 'express';
import moment from 'moment';
import { SUCCESS, SERVER_FAILED } from 'nagu-validates';
import { resCatagoryManager, resourceManager } from '../../config';

const router = new Router();

router.get('/',
  async (req, res) => {
    try {
      const stat = await Promise.all([
        resCatagoryManager.count(),
        resourceManager.count(),
        resourceManager.sumStatesLength(),
        resourceManager.countByCatagory(),
        resourceManager.countByCurrentState(),
        resourceManager.countBeforeDate(moment().subtract(1, 'M').toDate()),
        resourceManager.countBeforeDate(moment().subtract(3, 'M').toDate()),
        resourceManager.countBeforeDate(moment().subtract(6, 'M').toDate()),
      ]);
      const [catagoriesCount, resourcesCount,
        statesCount, countByCatagory, countByCurrentState,
        countBefore1Month, countBefore3Monthes, countBefore6Monthes] = stat;

      res.send({
        ret: SUCCESS,
        data: {
          catagoriesCount,
          resourcesCount,
          statesCount,
          countByCatagory,
          countByCurrentState,
          countBeforeDate: {
            ltOneMonth: resourcesCount - countBefore1Month,
            oneToThreeMonthes: countBefore1Month - countBefore3Monthes,
            threeToSixMonthes: countBefore3Monthes - countBefore6Monthes,
            gtSixMonthes: countBefore6Monthes,
          },
        },
      });
    } catch (msg) {
      res.send({
        ret: SERVER_FAILED,
        msg,
      });
    }
  }
);

export default router;
