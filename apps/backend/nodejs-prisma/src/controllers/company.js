import { logger, logWithContext } from '../config/logger.js';
import { cleanErrorPrisma } from '../functions/utils/clean-error-message.js';
import { validatePartialCompany } from '../schemas/company.js';
// import { validateDV } from "../functions/utils/validate-dv.js";

export class CompanyController {
  constructor({ companyModel }) {
    this.companyModel = companyModel;
  }

  getAll = async (req, res) => {
    const result = await this.companyModel.getAll();
    if (!Object.keys(result).length) {
      res.status(404);
    }
    res.json(result);
  };

  getById = async (req, res) => {
    const { id } = req.params;
    const result = await this.companyModel.getById({ id });
    if (!result) {
      res.status(404);
    }
    res.json(result);
  };

  update = async (req, res) => {
    const validate = validatePartialCompany(req.body);
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
      const result = await this.companyModel.update({
        id,
        input: validate.data,
      });
      res.json(result);
    } catch (error) {
      logger.error('An error occurred while performing the update operation for company ', {
        error: error.message,
      });
      const errorMessage = cleanErrorPrisma(error);
      res.status(404).json(errorMessage);
    }
  };
}
