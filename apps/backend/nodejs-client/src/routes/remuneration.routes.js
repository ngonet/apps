import { Router } from 'express';
import { RemunerationController } from '../controllers/remuneration.js';

export const createRemunerationRouter = ({ remunerationModel }) => {
  const remunerationRouter = Router();
  const remunerationController = new RemunerationController({ remunerationModel });
  remunerationRouter.post('/', remunerationController.create);
  remunerationRouter.get('/', remunerationController.getAll);
  remunerationRouter.get('/:id', remunerationController.getById);
  remunerationRouter.patch('/:id', remunerationController.update);
  remunerationRouter.delete('/:id', remunerationController.delete);
  return remunerationRouter;
};
