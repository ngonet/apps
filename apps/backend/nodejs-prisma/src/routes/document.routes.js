import { Router } from 'express';
import { DocumentController } from '../controllers/document.js';

export const createDocumentRouter = ({ documentModel }) => {
  const documentRouter = Router();
  const documentController = new DocumentController({ documentModel });
  documentRouter.post('/', documentController.create);
  documentRouter.get('/', documentController.getAll);
  documentRouter.get('/:id', documentController.getById);
  documentRouter.patch('/:id', documentController.update);
  documentRouter.delete('/:id', documentController.delete);
  documentRouter.get('/person/:personId', documentController.getAllByPersonId);
  return documentRouter;
};
