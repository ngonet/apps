import { Router } from 'express';
import { CommuneController } from '../controllers/commune.js';

export const createCommuneRouter = ({ communeModel }) => {
  const communeRouter = Router();
  const communeController = new CommuneController({ communeModel });
  communeRouter.get('/', communeController.getAll);
  communeRouter.get('/:id', communeController.getById);
  return communeRouter;
};
