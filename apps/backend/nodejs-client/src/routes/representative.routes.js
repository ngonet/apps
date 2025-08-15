import { Router } from 'express';
import { RepresentativeController } from '../controllers/representative.js';

export const createRepresentativeRouter = ({ representativeModel }) => {
  const representativeRouter = Router();
  const representativeController = new RepresentativeController({ representativeModel });
  representativeRouter.post('/', representativeController.create);
  representativeRouter.get('/', representativeController.getAll);
  representativeRouter.get('/:id', representativeController.getById);
  representativeRouter.patch('/:id', representativeController.update);
  representativeRouter.delete('/:id', representativeController.delete);
  return representativeRouter;
};
