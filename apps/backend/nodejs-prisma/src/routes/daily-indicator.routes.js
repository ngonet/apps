import { Router } from 'express';
import { DailyIndicatorController } from '../controllers/daily-indicator.js';

export const createDailyIndicatorRouter = ({ dailyIndicatorModel }) => {
  const dailyIndicatorRouter = Router();
  const dailyIndicatorController = new DailyIndicatorController({ dailyIndicatorModel });
  dailyIndicatorRouter.post('/', dailyIndicatorController.create);
  dailyIndicatorRouter.get('/', dailyIndicatorController.getAll);
  dailyIndicatorRouter.get('/:id', dailyIndicatorController.getById);
  dailyIndicatorRouter.patch('/:id', dailyIndicatorController.update);
  dailyIndicatorRouter.delete('/:id', dailyIndicatorController.delete);
  dailyIndicatorRouter.get('/date/:date', dailyIndicatorController.getByDate);
  return dailyIndicatorRouter;
};
