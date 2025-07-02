import { Router } from 'express';
import { AfcController } from '../controllers/afc.js';

export const createAfcRouter = ({ afcModel }) => {
  const afcRouter = Router();
  const afcController = new AfcController({ afcModel });
  afcRouter.post('/', afcController.create);
  afcRouter.get('/', afcController.getAll);
  afcRouter.get('/:id', afcController.getById);
  afcRouter.patch('/:id', afcController.update);
  afcRouter.delete('/:id', afcController.delete);
  afcRouter.get('/date/:date', afcController.getByDate);
  return afcRouter;
};
