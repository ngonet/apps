import { Router } from 'express';
import { AfpController } from '../controllers/afp.js';

export const createAfpRouter = ({ afpModel }) => {
  const afpRouter = Router();
  const afpController = new AfpController({ afpModel });
  afpRouter.post('/', afpController.create);
  afpRouter.get('/', afpController.getAll);
  afpRouter.get('/:id', afpController.getById);
  afpRouter.patch('/:id', afpController.update);
  afpRouter.delete('/:id', afpController.delete);
  return afpRouter;
};
