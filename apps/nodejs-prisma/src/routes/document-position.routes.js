import { Router } from 'express';
import { DocumentPositionController } from '../controllers/document-position.js';

export const createDocumentPositionRouter = ({ documentPositionModel }) => {
  const documentPositionRouter = Router();
  const documentPositionController = new DocumentPositionController({ documentPositionModel });
  documentPositionRouter.post('/', documentPositionController.create);
  documentPositionRouter.get('/', documentPositionController.getAll);
  documentPositionRouter.get('/:id', documentPositionController.getById);
  documentPositionRouter.patch('/:id', documentPositionController.update);
  documentPositionRouter.delete('/:id', documentPositionController.delete);
  return documentPositionRouter;
};
