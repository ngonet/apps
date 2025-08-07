import { Router } from 'express';
import { DiscountRemunerationController } from '../controllers/discount-remuneration.js';

export const createDiscountRemunerationRouter = ({ discountRemunerationModel }) => {
  const discountRemunerationRouter = Router();
  const discountRemunerationController = new DiscountRemunerationController({
    discountRemunerationModel,
  });
  discountRemunerationRouter.post('/', discountRemunerationController.create);
  discountRemunerationRouter.get('/', discountRemunerationController.getAll);
  discountRemunerationRouter.get('/:id', discountRemunerationController.getById);
  discountRemunerationRouter.patch('/:id', discountRemunerationController.update);
  discountRemunerationRouter.delete('/:id', discountRemunerationController.delete);
  return discountRemunerationRouter;
};
