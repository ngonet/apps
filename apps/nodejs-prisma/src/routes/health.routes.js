import { Router } from 'express';
import { HealthController } from '../controllers/health.js';

export const createHealthRouter = ({ healthModel }) => {
  const healthRouter = Router();
  const healthController = new HealthController({ healthModel });
  healthRouter.post('/', healthController.create);
  healthRouter.get('/', healthController.getAll);
  healthRouter.get('/:id', healthController.getById);
  healthRouter.patch('/:id', healthController.update);
  healthRouter.delete('/:id', healthController.delete);
  return healthRouter;
};
