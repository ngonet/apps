import { logger, logWithContext } from '../config/logger.js';
import { cleanErrorPrisma } from '../functions/utils/clean-error-message.js';
import { jsonStringToInt } from '../functions/utils/json-string-to-int.js';
import {
  validateDailyIndicator,
  validatePartialDailyIndicator,
} from '../schemas/daily-indicator.js';

export class DailyIndicatorController {
  constructor({ dailyIndicatorModel }) {
    this.dailyIndicatorModel = dailyIndicatorModel;
  }

  create = async (req, res) => {
    req.body.date = new Date(req.body.date);
    const validate = validateDailyIndicator(req.body);
    if (!validate.success) {
      return res.status(422).json(JSON.parse(validate.error.message));
    }
    try {
      const result = await this.dailyIndicatorModel.create({ input: validate.data });
      res.status(201).json(result);
    } catch (error) {
      logger.error('An error occurred while performing the create daily indicator record', {
        error: error.message,
      });
      const errorMessage = cleanErrorPrisma(error);
      res.status(412).json(errorMessage);
    }
  };

  getAll = async (req, res) => {
    const result = await this.dailyIndicatorModel.getAll();
    if (!Object.keys(result).length) {
      res.status(404);
    }
    res.json(result);
  };

  getById = async (req, res) => {
    const idParam = req.params.id;

    const { idQueryParamValue } = parseInt(idParam, 10);

    if (!idQueryParamValue) {
      return res.status(404).json({ message: 'ID no válido' });
    }

    const result = await this.dailyIndicatorModel.getById({ idQueryParamValue });
    if (!result) {
      res.status(404);
    }
    res.json(result);
  };

  getByDate = async (req, res) => {
    const date = new Date(req.params.date);
    const result = await this.dailyIndicatorModel.getByDate(date);
    if (!result) {
      res.status(404);
    }
    res.json(result);
  };

  update = async (req, res) => {
    const validate = validatePartialDailyIndicator(req.body);
    if (!validate.success) {
      return res.status(422).json({ error: JSON.parse(validate.error.message) });
    }
    try {
      var { id } = req.params;
      var { id } = jsonStringToInt({ id });

      const result = await this.dailyIndicatorModel.update({
        id,
        input: validate.data,
      });
      res.json(result);
    } catch (error) {
      logger.error('An error occurred while performing the update daily indicator record', {
        error: error.message,
      });
      const errorMessage = cleanErrorPrisma(error);
      res.status(404).json(errorMessage);
    }
  };

  delete = async (req, res) => {
    try {
      var { id } = req.params;
      var { id } = jsonStringToInt({ id });

      const result = await this.dailyIndicatorModel.delete({ id });
      res.json(result);
    } catch (error) {
      logger.error('An error occurred while performing the delete daily indicator record', {
        error: error.message,
      });
      const errorMessage = cleanErrorPrisma(error);
      res.status(404).json(errorMessage);
    }
  };
}
