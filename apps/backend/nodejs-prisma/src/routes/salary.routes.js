import { Router } from 'express';
import { SalaryController } from '../controllers/salary.js';

export const createSalaryRouter = ({ salaryModel }) => {
  const salaryRouter = Router();
  const salaryController = new SalaryController({ salaryModel });
  salaryRouter.post('/', salaryController.create);
  salaryRouter.get('/', salaryController.getAll);
  salaryRouter.get('/:id', salaryController.getById);
  salaryRouter.patch('/:id', salaryController.update);
  salaryRouter.delete('/:id', salaryController.delete);
  return salaryRouter;
};
