import { Router } from 'express';
import { HealthPersonController } from '../controllers/health-person.js';

export const createHealthPersonRouter = ({ healthPersonModel }) => {
  const healthPersonRouter = Router();
  const healthPersonController = new HealthPersonController({ healthPersonModel });
  healthPersonRouter.post('/', healthPersonController.create);
  healthPersonRouter.get('/', healthPersonController.getAll);
  healthPersonRouter.get('/:id', healthPersonController.getById);
  healthPersonRouter.patch('/:id', healthPersonController.update);
  healthPersonRouter.delete('/:id', healthPersonController.delete);
  healthPersonRouter.get('/person/:person', healthPersonController.getByPerson);
  return healthPersonRouter;
};
