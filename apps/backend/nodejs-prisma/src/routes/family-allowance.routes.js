import { Router } from 'express';
import { FamilyAllowanceController } from '../controllers/family-allowance.js';

export const createFamilyAllowanceRouter = ({ familyAllowanceModel }) => {
  const familyAllowanceRouter = Router();
  const familyAllowanceController = new FamilyAllowanceController({ familyAllowanceModel });
  familyAllowanceRouter.post('/', familyAllowanceController.create);
  familyAllowanceRouter.get('/', familyAllowanceController.getAll);
  familyAllowanceRouter.get('/:id', familyAllowanceController.getById);
  familyAllowanceRouter.get('/salary/:salary/date/:date', familyAllowanceController.getBySalary);
  familyAllowanceRouter.patch('/:id', familyAllowanceController.update);
  familyAllowanceRouter.delete('/:id', familyAllowanceController.delete);
  return familyAllowanceRouter;
};
