import { logWithContext } from '../config/logger.js';
import { cleanErrorPrisma } from '../functions/utils/clean-error-message.js';
import { validatePerson, validatePartialPerson } from '../schemas/person.js';
// import { validateDV } from "../functions/utils/validate-dv.js";

export class PersonController {
  constructor({ personModel }) {
    this.personModel = personModel;
  }

  create = async (req, res) => {
    req.body.birthdate = new Date(req.body.birthdate);
    const validate = validatePerson(req.body);
    if (!validate.success) {
      return res.status(422).json(JSON.parse(validate.error.message));
    }
    //    if (!validateDV({ rut: validate.data.rut })) {
    //      return res.status(422).json({ message: `Invalid rut` });
    //    }
    try {
      const result = await this.personModel.create({ input: validate.data });
      res.status(201).json(result);
    } catch (error) {
      logWithContext('error', `Error to create: ${error.message}`);
      const errorMessage = cleanErrorPrisma(error);
      res.status(412).json(errorMessage);
    }
  };

  getAll = async (req, res) => {
    const result = await this.personModel.getAll();
    if (!Object.keys(result).length) {
      res.status(404);
    }
    res.json(result);
  };

  getById = async (req, res) => {
    const { id } = req.params;
    const result = await this.personModel.getById({ id });
    if (!result) {
      res.status(404);
    }
    res.json(result);
  };

  update = async (req, res) => {
    if (req.body.birthdate) {
      req.body.birthdate = new Date(req.body.birthdate);
    }
    const validate = validatePartialPerson(req.body);
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
      const result = await this.personModel.update({
        id,
        input: validate.data,
      });
      res.json(result);
    } catch (error) {
      logWithContext('error', `Error to update : ${error.message}`);
      const errorMessage = cleanErrorPrisma(error);
      res.status(404).json(errorMessage);
    }
  };

  delete = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await this.personModel.delete({ id });
      res.json(result);
    } catch (error) {
      logWithContext('error', `Error to delete(${id}): ${error.message}`);
      const errorMessage = cleanErrorPrisma(error);
      res.status(404).json(errorMessage);
    }
  };
}
