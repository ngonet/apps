import { Router } from 'express';
import { BurdenController } from '../controllers/burden.js';

export const createBurdenRouter = ({ burdenModel }) => {
  const burdenRouter = Router();
  const burdenController = new BurdenController({ burdenModel });
  burdenRouter.post('/', burdenController.create);
  burdenRouter.get('/', burdenController.getAll);
  burdenRouter.get('/:id', burdenController.getById);
  burdenRouter.patch('/:id', burdenController.update);
  burdenRouter.delete('/:id', burdenController.delete);
  burdenRouter.get('/person/:person', burdenController.getByPerson);
  return burdenRouter;
};
