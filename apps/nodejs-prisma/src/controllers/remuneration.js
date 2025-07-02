import { logger, logWithContext } from '../config/logger.js';
import { cleanErrorPrisma } from '../functions/utils/clean-error-message.js';
import { validateRemuneration, validatePartialRemuneration } from '../schemas/remuneration.js';

export class RemunerationController {
  constructor({ remunerationModel }) {
    this.remunerationModel = remunerationModel;
  }

  create = async (req, res) => {
    req.body.date = new Date(req.body.date);
    const validate = validateRemuneration(req.body);
    if (!validate.success) {
      return res.status(422).json(JSON.parse(validate.error.message));
    }
    try {
      const result = await this.remunerationModel.create({ input: validate.data });
      res.status(201).json(result);
    } catch (error) {
      logger.error('An error occurred while performing the create remuneration record', {
        error: error.message,
      });
      const errorMessage = cleanErrorPrisma(error);
      res.status(412).json(errorMessage);
    }
  };

  getAll = async (req, res) => {
    const result = await this.remunerationModel.getAll();
    if (!Object.keys(result).length) {
      res.status(404);
    }
    res.json(result);
  };

  getById = async (req, res) => {
    const { id } = req.params;
    const result = await this.remunerationModel.getById({ id });
    if (!result) {
      res.status(404);
    }
    res.json(result);
  };

  update = async (req, res) => {
    if (req.body.date) {
      req.body.date = new Date(req.body.date);
    }
    const validate = validatePartialRemuneration(req.body);
    if (!validate.success) {
      return res.status(422).json({ error: JSON.parse(validate.error.message) });
    }
    const { id } = req.params;
    try {
      const result = await this.remunerationModel.update({
        id,
        input: validate.data,
      });
      res.json(result);
    } catch (error) {
      logger.error('An error occurred while performing the update remuneration record', {
        error: error.message,
      });
      const errorMessage = cleanErrorPrisma(error);
      res.status(404).json(errorMessage);
    }
  };

  delete = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await this.remunerationModel.delete({ id });
      res.json(result);
    } catch (error) {
      logger.error('An error occurred while performing the delete remuneration record', {
        error: error.message,
      });
      const errorMessage = cleanErrorPrisma(error);
      res.status(404).json(errorMessage);
    }
  };
}
