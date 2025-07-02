import { Router } from 'express';
import { AfpPersonController } from '../controllers/afp-person.js';

export const createAfpPersonRouter = ({ afpPersonModel }) => {
  const afpPersonRouter = Router();
  const afpPersonController = new AfpPersonController({ afpPersonModel });
  afpPersonRouter.post('/', afpPersonController.create);
  afpPersonRouter.get('/', afpPersonController.getAll);
  afpPersonRouter.get('/:id', afpPersonController.getById);
  afpPersonRouter.patch('/:id', afpPersonController.update);
  afpPersonRouter.delete('/:id', afpPersonController.delete);
  afpPersonRouter.get('/person/:person', afpPersonController.getByPerson);
  return afpPersonRouter;
};
