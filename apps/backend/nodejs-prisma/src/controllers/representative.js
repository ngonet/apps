import { cleanErrorPrisma } from '../functions/utils/clean-error-message.js';
import {
  validateRepresentative,
  validatePartialRepresentative,
} from '../schemas/representative.js';
// import { validateDV } from "../functions/utils/validate-dv.js";

export class RepresentativeController {
  constructor({ representativeModel }) {
    this.representativeModel = representativeModel;
  }

  create = async (req, res) => {
    const validate = validateRepresentative(req.body);
    if (!validate.success) {
      return res.status(422).json(JSON.parse(validate.error.message));
    }
    //    if (!validateDV({ rut: validate.data.rut })) {
    //      return res.status(422).json({ message: `Invalid rut` });
    //    }
    try {
      const result = await this.representativeModel.create({
        input: validate.data,
      });
      res.status(201).json(result);
    } catch (error) {
      const errorMessage = cleanErrorPrisma(error);
      res.status(412).json(errorMessage);
    }
  };

  getAll = async (req, res) => {
    const result = await this.representativeModel.getAll();
    if (!Object.keys(result).length) {
      res.status(404);
    }
    res.json(result);
  };

  getById = async (req, res) => {
    const { id } = req.params;
    const result = await this.representativeModel.getById({ id });
    if (!result) {
      res.status(404);
    }
    res.json(result);
  };

  update = async (req, res) => {
    const validate = validatePartialRepresentative(req.body);
    if (!validate.success) {
      return res.status(422).json({ error: JSON.parse(validate.error.message) });
    }
    if (req.body.rut) {
      //      if (!validateDV({ rut: validate.data.rut })) {
      //        return res.status(422).json({ message: `Invalid rut` });
      //      }
    }
    const { id } = req.params;
    try {
      const result = await this.representativeModel.update({
        id,
        input: validate.data,
      });
      res.json(result);
    } catch (error) {
      const errorMessage = cleanErrorPrisma(error);
      res.status(404).json(errorMessage);
    }
  };

  delete = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await this.representativeModel.delete({ id });
      res.json(result);
    } catch (error) {
      const errorMessage = cleanErrorPrisma(error);
      res.status(404).json(errorMessage);
    }
  };
}
