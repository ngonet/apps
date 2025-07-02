import { Router } from 'express';
import { DocumentTypeController } from '../controllers/document-type.js';

export const createDocumentTypeRouter = ({ documentTypeModel }) => {
  const documentTypeRouter = Router();
  const documentTypeController = new DocumentTypeController({ documentTypeModel });
  documentTypeRouter.get('/', documentTypeController.getAll);
  documentTypeRouter.get('/:id', documentTypeController.getById);
  return documentTypeRouter;
};
