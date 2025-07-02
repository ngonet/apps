import { logger, logWithContext } from '../config/logger.js';
import { cleanErrorPrisma } from '../functions/utils/clean-error-message.js';
import { jsonStringToInt } from '../functions/utils/json-string-to-int.js';
import {
  validateFamilyAllowance,
  validatePartialFamilyAllowance,
} from '../schemas/family-allowance.js';

export class FamilyAllowanceController {
  constructor({ familyAllowanceModel }) {
    this.familyAllowanceModel = familyAllowanceModel;
  }

  create = async (req, res) => {
    const validate = validateFamilyAllowance(req.body);
    if (!validate.success) {
      return res.status(422).json(JSON.parse(validate.error.message));
    }
    try {
      const result = await this.familyAllowanceModel.create({ input: validate.data });
      res.status(201).json(result);
    } catch (error) {
      logger.error('An error occurred while performing the create family allowance record', {
        error: error.message,
      });
      const errorMessage = cleanErrorPrisma(error);
      res.status(412).json(errorMessage);
    }
  };

  getAll = async (req, res) => {
    const result = await this.familyAllowanceModel.getAll();
    if (!Object.keys(result).length) {
      res.status(404);
    }
    res.json(result);
  };

  getById = async (req, res) => {
    var { id } = req.params;
    var { id } = jsonStringToInt({ id });
    const result = await this.familyAllowanceModel.getById({ id });
    if (!result) {
      res.status(404);
    }
    res.json(result);
  };

  getBySalary = async (req, res) => {
    const { salary } = req.params;
    const { date } = req.params;

    const result = await this.familyAllowanceModel.getBySalary(salary, date);
    if (!result) {
      res.status(404);
    }
    res.json(result);
  };

  update = async (req, res) => {
    const validate = validatePartialFamilyAllowance(req.body);
    if (!validate.success) {
      return res.status(422).json({ error: JSON.parse(validate.error.message) });
    }
    var { id } = req.params;
    var { id } = jsonStringToInt({ id });
    try {
      const result = await this.familyAllowanceModel.update({
        id,
        input: validate.data,
      });
      res.json(result);
    } catch (error) {
      logger.error('An error occurred while performing the update family allowance record', {
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
      const result = await this.familyAllowanceModel.delete({ id });
      res.json(result);
    } catch (error) {
      logger.error('An error occurred while performing the delete family allowance record', {
        error: error.message,
      });
      const errorMessage = cleanErrorPrisma(error);
      res.status(404).json(errorMessage);
    }
  };
}
