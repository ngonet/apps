import { logger, logWithContext } from '../config/logger.js';
import { cleanErrorPrisma } from '../functions/utils/clean-error-message.js';
import { jsonStringToInt } from '../functions/utils/json-string-to-int.js';
import { validateAfc, validatePartialAfc } from '../schemas/afc.js';

export class AfcController {
  constructor({ afcModel }) {
    this.afcModel = afcModel;
  }

  create = async (req, res) => {
    const validate = validateAfc(req.body);
    if (!validate.success) {
      return res.status(422).json(JSON.parse(validate.error.message));
    }
    try {
      const result = await this.afcModel.create({ input: validate.data });
      res.status(201).json(result);
    } catch (error) {
      logger.error('An error occurred while performing the create operation', {
        error: error.message,
      });
      const errorMessage = cleanErrorPrisma(error);
      res.status(412).json(errorMessage);
    }
  };

  getAll = async (req, res) => {
    const result = await this.afcModel.getAll();
    if (!Object.keys(result).length) {
      res.status(404);
    }
    res.json(result);
  };

  getById = async (req, res) => {
    var { id } = req.params;
    var { id } = jsonStringToInt({ id });
    const result = await this.afcModel.getById({ id });
    if (!result) {
      res.status(404);
    }
    res.json(result);
  };

  getByDate = async (req, res) => {
    const date = new Date(req.params.date);
    const result = await this.afcModel.getByDate(date);
    if (!result) {
      res.status(404);
    }
    res.json(result);
  };

  update = async (req, res) => {
    const validate = validatePartialAfc(req.body);
    if (!validate.success) {
      return res.status(422).json({ error: JSON.parse(validate.error.message) });
    }
    var { id } = req.params;
    var { id } = jsonStringToInt({ id });
    try {
      const result = await this.afcModel.update({
        id,
        input: validate.data,
      });
      res.json(result);
    } catch (error) {
      logger.error('An error occurred while performing the update operation', {
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
      const result = await this.afcModel.delete({ id });
      res.json(result);
    } catch (error) {
      logger.error('An error occurred while performing the delete operation', {
        error: error.message,
      });
      const errorMessage = cleanErrorPrisma(error);
      res.status(404).json(errorMessage);
    }
  };
}
