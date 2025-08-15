import { Router } from 'express';
import { RemunerationSalaryController } from '../controllers/remuneration-salary.js';

export const createRemunerationSalaryRouter = ({ remunerationSalaryModel }) => {
  const remunerationSalaryRouter = Router();
  const remunerationSalaryController = new RemunerationSalaryController({
    remunerationSalaryModel,
  });
  remunerationSalaryRouter.post('/', remunerationSalaryController.create);
  remunerationSalaryRouter.get('/', remunerationSalaryController.getAll);
  remunerationSalaryRouter.get('/:id', remunerationSalaryController.getById);
  remunerationSalaryRouter.patch('/:id', remunerationSalaryController.update);
  remunerationSalaryRouter.delete('/:id', remunerationSalaryController.delete);
  return remunerationSalaryRouter;
};
