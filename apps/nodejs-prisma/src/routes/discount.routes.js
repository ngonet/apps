import { Router } from 'express';
import { DiscountController } from '../controllers/discount.js';

export const createDiscountRouter = ({ discountModel }) => {
  const discountRouter = Router();
  const discountController = new DiscountController({ discountModel });
  discountRouter.post('/', discountController.create);
  discountRouter.get('/', discountController.getAll);
  discountRouter.get('/:id', discountController.getById);
  discountRouter.patch('/:id', discountController.update);
  discountRouter.delete('/:id', discountController.delete);
  return discountRouter;
};
