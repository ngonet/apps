import { logger, logWithContext } from '../config/logger.js';
import { cleanErrorPrisma } from '../functions/utils/clean-error-message.js';
import { validateDV } from '../functions/utils/validate-dv.js';
import { validateBurden, validatePartialBurden } from '../schemas/burden.js';

export class BurdenController {
  constructor({ burdenModel }) {
    this.burdenModel = burdenModel;
  }

  create = async (req, res) => {
    req.body.birthdate = new Date(req.body.birthdate);
    const validate = validateBurden(req.body);
    if (!validate.success) {
      return res.status(422).json(JSON.parse(validate.error.message));
    }
    if (!validateDV({ rut: validate.data.rut })) {
      return res.status(422).json({ message: `Invalid rut` });
    }
    try {
      const result = await this.burdenModel.create({ input: validate.data });
      res.status(201).json(result);
    } catch (error) {
      logger.error('An error occurred while performing the create operation', {
        error: error.message,
      });
      const errorMessage = cleanErrorPrisma(error);
      res.status(412).json(error);
    }
  };

  getAll = async (req, res) => {
    const result = await this.burdenModel.getAll();
    if (!Object.keys(result).length) {
      res.status(404);
    }
    res.json(result);
  };

  getById = async (req, res) => {
    const { id } = req.params;
    const result = await this.burdenModel.getById({ id });
    if (!result) {
      res.status(404);
    }
    res.json(result);
  };

  getByPerson = async (req, res) => {
    const { person } = req.params;
    const result = await this.burdenModel.getByPerson(person);
    if (!result && result != 0) {
      res.status(404);
    }
    res.json(result);
  };

  update = async (req, res) => {
    if (req.body.birthdate) {
      req.body.birthdate = new Date(req.body.birthdate);
    }
    const validate = validatePartialBurden(req.body);
    if (!validate.success) {
      return res.status(422).json({ error: JSON.parse(validate.error.message) });
    }
    if (req.body.rut) {
      if (!validateDV({ rut: validate.data.rut })) {
        return res.status(422).json({ message: `Invalid rut` });
      }
    }
    const { id } = req.params;
    try {
      const result = await this.burdenModel.update({
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
      const result = await this.burdenModel.delete({ id });
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
