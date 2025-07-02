import { logger, logWithContext } from '../config/logger.js';
import { cleanErrorPrisma } from '../functions/utils/clean-error-message.js';
import { validateDocument, validatePartialDocument } from '../schemas/document.js';

export class DocumentController {
  constructor({ documentModel }) {
    this.documentModel = documentModel;
  }

  create = async (req, res) => {
    req.body.date = new Date(req.body.date);
    if (req.body.endDate) {
      req.body.endDate = new Date(req.body.endDate);
    }
    const validate = validateDocument(req.body);
    if (!validate.success) {
      return res.status(422).json(JSON.parse(validate.error.message));
    }
    try {
      const result = await this.documentModel.create({ input: validate.data });
      res.status(201).json(result);
    } catch (error) {
      logger.error('An error occurred while performing the create document record', {
        error: error.message,
      });
      const errorMessage = cleanErrorPrisma(error);
      res.status(412).json(errorMessage);
    }
  };

  getAll = async (req, res) => {
    const result = await this.documentModel.getAll();
    if (!Object.keys(result).length) {
      res.status(404);
    }
    res.json(result);
  };

  getAllByPersonId = async (req, res) => {
    const { personId } = req.params;
    const result = await this.documentModel.getAllByPersonId({ personId });
    if (!Object.keys(result).length) {
      res.status(404);
    }
    res.json(result);
  };

  getById = async (req, res) => {
    const { id } = req.params;
    const result = await this.documentModel.getById({ id });
    if (!result) {
      res.status(404);
    }
    res.json(result);
  };

  update = async (req, res) => {
    if (req.body.date) {
      req.body.date = new Date(req.body.date);
    }
    if (req.body.endDate) {
      req.body.endDate = new Date(req.body.endDate);
    }
    const validate = validatePartialDocument(req.body);
    if (!validate.success) {
      return res.status(422).json({ error: JSON.parse(validate.error.message) });
    }
    const { id } = req.params;
    try {
      const result = await this.documentModel.update({
        id,
        input: validate.data,
      });
      res.json(result);
    } catch (error) {
      logger.error('An error occurred while performing the update document record', {
        error: error.message,
      });
      const errorMessage = cleanErrorPrisma(error);
      res.status(404).json(errorMessage);
    }
  };

  delete = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await this.documentModel.delete({ id });
      res.json(result);
    } catch (error) {
      logger.error('An error occurred while performing the delete document record', {
        error: error.message,
      });
      const errorMessage = cleanErrorPrisma(error);
      res.status(404).json(errorMessage);
    }
  };
}
