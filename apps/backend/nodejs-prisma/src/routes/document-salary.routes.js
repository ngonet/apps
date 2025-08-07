import { Router } from 'express';
import { DocumentSalaryController } from '../controllers/document-salary.js';

export const createDocumentSalaryRouter = ({ documentSalaryModel }) => {
  const documentSalaryRouter = Router();
  const documentSalaryController = new DocumentSalaryController({ documentSalaryModel });
  documentSalaryRouter.post('/', documentSalaryController.create);
  documentSalaryRouter.get('/', documentSalaryController.getAll);
  documentSalaryRouter.get('/:id', documentSalaryController.getById);
  documentSalaryRouter.patch('/:id', documentSalaryController.update);
  documentSalaryRouter.delete('/:id', documentSalaryController.delete);
  return documentSalaryRouter;
};
