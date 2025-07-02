import { logger, logWithContext } from '../config/logger.js';
import { cleanErrorPrisma } from '../functions/utils/clean-error-message.js';
import {
  validateProvisionalIndicator,
  validatePartialProvisionalIndicator,
} from '../schemas/provisional-indicator.js';

export class ProvisionalIndicatorController {
  constructor({ provisionalIndicatorModel }) {
    this.provisionalIndicatorModel = provisionalIndicatorModel;
  }

  create = async (req, res) => {
    const validate = validateProvisionalIndicator(req.body);
    if (!validate.success) {
      return res.status(422).json(JSON.parse(validate.error.message));
    }
    try {
      const result = await this.provisionalIndicatorModel.create({ input: validate.data });
      res.status(201).json(result);
    } catch (error) {
      logger.error('An error occurred while performing the create provisional indicator record', {
        error: error.message,
      });
      const errorMessage = cleanErrorPrisma(error);
      res.status(412).json(errorMessage);
    }
  };

  getAll = async (req, res) => {
    const result = await this.provisionalIndicatorModel.getAll();
    if (!Object.keys(result).length) {
      res.status(404);
    }
    res.json(result);
  };

  getById = async (req, res) => {
    const { id } = req.params;
    const result = await this.provisionalIndicatorModel.getById({ id });
    if (!result) {
      res.status(404);
    }
    res.json(result);
  };

  getByDate = async (req, res) => {
    const date = new Date(req.params.date);
    const result = await this.provisionalIndicatorModel.getByDate(date);
    if (!result) {
      res.status(404);
    }
    res.json(result);
  };

  update = async (req, res) => {
    const validate = validatePartialProvisionalIndicator(req.body);
    if (!validate.success) {
      return res.status(422).json({ error: JSON.parse(validate.error.message) });
    }
    const { id } = req.params;
    try {
      const result = await this.provisionalIndicatorModel.update({
        id,
        input: validate.data,
      });
      res.json(result);
    } catch (error) {
      logger.error('An error occurred while performing the update provisional indicator record', {
        error: error.message,
      });
      const errorMessage = cleanErrorPrisma(error);
      res.status(404).json(errorMessage);
    }
  };

  delete = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await this.provisionalIndicatorModel.delete({ id });
      res.json(result);
    } catch (error) {
      logger.error('An error occurred while performing the delete provisional indicator record', {
        error: error.message,
      });
      const errorMessage = cleanErrorPrisma(error);
      res.status(404).json(errorMessage);
    }
  };
}
