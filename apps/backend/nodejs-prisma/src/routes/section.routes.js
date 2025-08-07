import { Router } from 'express';
import { SectionController } from '../controllers/section.js';

export const createSectionRouter = ({ sectionModel }) => {
  const sectionRouter = Router();
  const sectionController = new SectionController({ sectionModel });
  sectionRouter.get('/', sectionController.getAll);
  sectionRouter.get('/:id', sectionController.getById);
  sectionRouter.patch('/:id', sectionController.update);
  return sectionRouter;
};
