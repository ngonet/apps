import { cleanErrorPrisma } from '../functions/utils/clean-error-message.js';
import { validateDV } from '../functions/utils/validate-dv.js';
import { validateAfp, validatePartialAfp } from '../schemas/afp.js';

export class AfpController {
  constructor({ afpModel }) {
    this.afpModel = afpModel;
  }

  create = async (req, res) => {
    req.body.since = new Date(req.body.since);
    req.body.until = new Date(req.body.until);
    const validate = validateAfp(req.body);
    if (!validate.success) {
      return res.status(422).json(JSON.parse(validate.error.message));
    }
    if (!validateDV({ rut: validate.data.rut })) {
      return res.status(422).json({ message: `Invalid rut` });
    }
    try {
      const result = await this.afpModel.create({ input: validate.data });
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
    const result = await this.afpModel.getAll();
    if (!Object.keys(result).length) {
      res.status(404);
    }
    res.json(result);
  };

  getById = async (req, res) => {
    const { id } = req.params;
    const result = await this.afpModel.getById({ id });
    if (!result) {
      res.status(404);
    }
    res.json(result);
  };

  update = async (req, res) => {
    const validate = validatePartialAfp(req.body);
    if (!validate.success) {
      return res.status(422).json({ error: JSON.parse(validate.error.message) });
    }
    const { id } = req.params;
    try {
      const result = await this.afpModel.update({
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
      const result = await this.afpModel.delete({ id });
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
