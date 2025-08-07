import { Router } from 'express';
import { PositionController } from '../controllers/position.js';

export const createPositionRouter = ({ positionModel }) => {
  const positionRouter = Router();
  const positionController = new PositionController({ positionModel });
  positionRouter.post('/', positionController.create);
  positionRouter.get('/', positionController.getAll);
  positionRouter.get('/parent', positionController.getAllParent);
  positionRouter.get('/:id', positionController.getById);
  positionRouter.patch('/:id', positionController.update);
  positionRouter.delete('/:id', positionController.delete);
  return positionRouter;
};
