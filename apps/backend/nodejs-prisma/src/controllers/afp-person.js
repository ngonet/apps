import { logger, logWithContext } from '../config/logger.js';
import { cleanErrorPrisma } from '../functions/utils/clean-error-message.js';
import { validateAfpPerson, validatePartialAfpPerson } from '../schemas/afp-person.js';

export class AfpPersonController {
  constructor({ afpPersonModel }) {
    this.afpPersonModel = afpPersonModel;
  }

  create = async (req, res) => {
    const validate = validateAfpPerson(req.body);
    if (!validate.success) {
      return res.status(422).json(JSON.parse(validate.error.message));
    }
    try {
      const result = await this.afpPersonModel.create({ input: validate.data });
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
    const result = await this.afpPersonModel.getAll();
    if (!Object.keys(result).length) {
      res.status(404);
    }
    res.json(result);
  };

  getById = async (req, res) => {
    const { id } = req.params;
    const result = await this.afpPersonModel.getById({ id });
    if (!result) {
      res.status(404);
    }
    res.json(result);
  };

  getByPerson = async (req, res) => {
    const { person } = req.params;
    const result = await this.afpPersonModel.getByPerson(person);
    if (!result) {
      res.status(404);
    }
    res.json(result);
  };

  update = async (req, res) => {
    const validate = validatePartialAfpPerson(req.body);
    if (!validate.success) {
      return res.status(422).json({ error: JSON.parse(validate.error.message) });
    }
    const { id } = req.params;
    try {
      const result = await this.afpPersonModel.update({
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
    const { id } = req.params;
    try {
      const result = await this.afpPersonModel.delete({ id });
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
