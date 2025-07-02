import { Router } from 'express';
import { SingleTaxController } from '../controllers/single-tax.js';

export const createSingleTaxRouter = ({ singleTaxModel }) => {
  const singleTaxRouter = Router();
  const singleTaxController = new SingleTaxController({ singleTaxModel });
  singleTaxRouter.post('/', singleTaxController.create);
  singleTaxRouter.get('/', singleTaxController.getAll);
  singleTaxRouter.get('/:id', singleTaxController.getById);
  singleTaxRouter.patch('/:id', singleTaxController.update);
  singleTaxRouter.delete('/:id', singleTaxController.delete);
  singleTaxRouter.get('/taxableBaseUtm/:taxableBaseUtm', singleTaxController.getFactor);

  return singleTaxRouter;
};
