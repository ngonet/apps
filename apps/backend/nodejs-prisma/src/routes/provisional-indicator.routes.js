import { Router } from 'express';
import { ProvisionalIndicatorController } from '../controllers/provisional-indicator.js';

export const createProvisionalIndicatorRouter = ({ provisionalIndicatorModel }) => {
  const provisionalIndicatorRouter = Router();
  const provisionalIndicatorController = new ProvisionalIndicatorController({
    provisionalIndicatorModel,
  });
  provisionalIndicatorRouter.post('/', provisionalIndicatorController.create);
  provisionalIndicatorRouter.get('/', provisionalIndicatorController.getAll);
  provisionalIndicatorRouter.get('/:id', provisionalIndicatorController.getById);
  provisionalIndicatorRouter.patch('/:id', provisionalIndicatorController.update);
  provisionalIndicatorRouter.delete('/:id', provisionalIndicatorController.delete);
  provisionalIndicatorRouter.get('/date/:date', provisionalIndicatorController.getByDate);
  return provisionalIndicatorRouter;
};
