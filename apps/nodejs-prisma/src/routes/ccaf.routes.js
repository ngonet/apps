import { Router } from 'express';
import { CcafController } from '../controllers/ccaf.js';

export const createCcafRouter = ({ ccafModel }) => {
  const ccafRouter = Router();
  const ccafController = new CcafController({ ccafModel });
  ccafRouter.post('/', ccafController.create);
  ccafRouter.get('/', ccafController.getAll);
  ccafRouter.get('/:id', ccafController.getById);
  ccafRouter.patch('/:id', ccafController.update);
  ccafRouter.delete('/:id', ccafController.delete);
  return ccafRouter;
};
