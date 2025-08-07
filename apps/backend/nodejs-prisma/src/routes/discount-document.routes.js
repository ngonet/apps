import { Router } from 'express';
import { DiscountDocumentController } from '../controllers/discount-document.js';

export const createDiscountDocumentRouter = ({ discountDocumentModel }) => {
  const discountDocumentRouter = Router();
  const discountDocumentController = new DiscountDocumentController({ discountDocumentModel });
  discountDocumentRouter.post('/', discountDocumentController.create);
  discountDocumentRouter.get('/', discountDocumentController.getAll);
  discountDocumentRouter.get('/:id', discountDocumentController.getById);
  discountDocumentRouter.patch('/:id', discountDocumentController.update);
  discountDocumentRouter.delete('/:id', discountDocumentController.delete);
  return discountDocumentRouter;
};
