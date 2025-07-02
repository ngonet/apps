import { Router } from 'express';
import { PersonController } from '../controllers/person.js';

export const createPersonRouter = ({ personModel }) => {
  const personRouter = Router();
  const personController = new PersonController({ personModel });
  personRouter.post('/', personController.create);
  personRouter.get('/', personController.getAll);
  personRouter.get('/:id', personController.getById);
  personRouter.patch('/:id', personController.update);
  personRouter.delete('/:id', personController.delete);
  return personRouter;
};
