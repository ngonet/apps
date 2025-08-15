import { logger, logWithContext } from '../config/logger.js';
import { cleanErrorPrisma } from '../functions/utils/clean-error-message.js';
import { jsonStringToInt } from '../functions/utils/json-string-to-int.js';
import {
  validateDiscountRemuneration,
  validatePartialDiscountRemuneration,
} from '../schemas/discount-remuneration.js';

export class DiscountRemunerationController {
  constructor({ discountRemunerationModel }) {
    this.discountRemunerationModel = discountRemunerationModel;
  }

  create = async (req, res) => {
    const validate = validateDiscountRemuneration(req.body);
    if (!validate.success) {
      return res.status(422).json(JSON.parse(validate.error.message));
    }
    try {
      const result = await this.discountRemunerationModel.create({
        input: validate.data,
      });
      res.status(201).json(result);
    } catch (error) {
      logger.error('An error occurred while performing the create  discount remuneration record', {
        error: error.message,
      });
      const errorMessage = cleanErrorPrisma(error);
      res.status(412).json(errorMessage);
    }
  };

  getAll = async (req, res) => {
    const result = await this.discountRemunerationModel.getAll();
    if (!Object.keys(result).length) {
      res.status(404);
    }
    res.json(result);
  };

  getById = async (req, res) => {
    var { id } = req.params;
    var { id } = jsonStringToInt({ id });
    const result = await this.discountRemunerationModel.getById({ id });
    if (!result) {
      res.status(404);
    }
    res.json(result);
  };

  update = async (req, res) => {
    const validate = validatePartialDiscountRemuneration(req.body);
    if (!validate.success) {
      return res.status(422).json({ error: JSON.parse(validate.error.message) });
    }
    var { id } = req.params;
    var { id } = jsonStringToInt({ id });
    try {
      const result = await this.discountRemunerationModel.update({
        id,
        input: validate.data,
      });
      res.json(result);
    } catch (error) {
      logger.error('An error occurred while performing the update  discount remuneration record', {
        error: error.message,
      });
      const errorMessage = cleanErrorPrisma(error);
      res.status(404).json(errorMessage);
    }
  };

  delete = async (req, res) => {
    var { id } = req.params;
    var { id } = jsonStringToInt({ id });
    try {
      const result = await this.discountRemunerationModel.delete({ id });
      res.json(result);
    } catch (error) {
      logger.error('An error occurred while performing the delete  discount remuneration record', {
        error: error.message,
      });
      const errorMessage = cleanErrorPrisma(error);
      res.status(404).json(errorMessage);
    }
  };
}
