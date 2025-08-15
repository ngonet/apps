import { Router } from 'express';
import { CompanyController } from '../controllers/company.js';

export const createCompanyRouter = ({ companyModel }) => {
  const companyRouter = Router();
  const companyController = new CompanyController({ companyModel });
  companyRouter.get('/', companyController.getAll);
  companyRouter.get('/:id', companyController.getById);
  companyRouter.patch('/:id', companyController.update);
  return companyRouter;
};
