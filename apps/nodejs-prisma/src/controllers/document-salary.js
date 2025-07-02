import { logger, logWithContext } from '../config/logger.js';
import { cleanErrorPrisma } from '../functions/utils/clean-error-message.js';
import { jsonStringToInt } from '../functions/utils/json-string-to-int.js';
import {
  validateDocumentSalary,
  validatePartialDocumentSalary,
} from '../schemas/document-salary.js';

export class DocumentSalaryController {
  constructor({ documentSalaryModel }) {
    this.documentSalaryModel = documentSalaryModel;
  }

  create = async (req, res) => {
    req.body.since = new Date(req.body.since);
    req.body.until = new Date(req.body.until);
    const validate = validateDocumentSalary(req.body);
    if (!validate.success) {
      return res.status(422).json(JSON.parse(validate.error.message));
    }
    try {
      const result = await this.documentSalaryModel.create({ input: validate.data });
      res.status(201).json(result);
    } catch (error) {
      logger.error('An error occurred while performing the create document salary record', {
        error: error.message,
      });
      const errorMessage = cleanErrorPrisma(error);
      res.status(412).json(errorMessage);
    }
  };

  getAll = async (req, res) => {
    const result = await this.documentSalaryModel.getAll();
    if (!Object.keys(result).length) {
      res.status(404);
    }
    res.json(result);
  };

  getById = async (req, res) => {
    var { id } = req.params;
    var { id } = jsonStringToInt({ id });
    const result = await this.documentSalaryModel.getById({ id });
    if (!result) {
      res.status(404);
    }
    res.json(result);
  };

  update = async (req, res) => {
    const validate = validatePartialDocumentSalary(req.body);
    if (!validate.success) {
      return res.status(422).json({ error: JSON.parse(validate.error.message) });
    }
    var { id } = req.params;
    var { id } = jsonStringToInt({ id });
    try {
      const result = await this.documentSalaryModel.update({
        id,
        input: validate.data,
      });
      res.json(result);
    } catch (error) {
      logger.error('An error occurred while performing the update document salary record', {
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
      const result = await this.documentSalaryModel.delete({ id });
      res.json(result);
    } catch (error) {
      logger.error('An error occurred while performing the update document salary record', {
        error: error.message,
      });
      const errorMessage = cleanErrorPrisma(error);
      res.status(404).json(errorMessage);
    }
  };
}
