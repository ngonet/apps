import { cleanErrorPrisma } from '../functions/utils/clean-error-message.js';
import { jsonStringToInt } from '../functions/utils/json-string-to-int.js';
import { validateSingleTax, validatePartialSingleTax } from '../schemas/single-tax.js';

export class SingleTaxController {
  constructor({ singleTaxModel }) {
    this.singleTaxModel = singleTaxModel;
  }

  create = async (req, res) => {
    req.body.date = new Date(req.body.date);
    const validate = validateSingleTax(req.body);
    if (!validate.success) {
      return res.status(422).json(JSON.parse(validate.error.message));
    }
    try {
      const result = await this.singleTaxModel.create({ input: validate.data });
      res.status(201).json(result);
    } catch (error) {
      const errorMessage = cleanErrorPrisma(error);
      res.status(412).json(errorMessage);
    }
  };

  getAll = async (req, res) => {
    const result = await this.singleTaxModel.getAll();
    if (!Object.keys(result).length) {
      res.status(404);
    }
    res.json(result);
  };

  getById = async (req, res) => {
    var { id } = req.params;
    var { id } = jsonStringToInt({ id });
    const result = await this.singleTaxModel.getById({ id });
    if (!result) {
      res.status(404);
    }
    res.json(result);
  };

  getFactor = async (req, res) => {
    const { taxableBaseUtm } = req.params;
    // console.log("taxableBaseUtm: ", taxableBaseUtm);
    const result = await this.singleTaxModel.getFactor(taxableBaseUtm);
    if (!result) {
      res.status(404);
    }
    res.json(result);
  };

  update = async (req, res) => {
    if (req.body.date) {
      req.body.date = new Date(req.body.date);
    }
    const validate = validatePartialSingleTax(req.body);
    if (!validate.success) {
      return res.status(422).json({ error: JSON.parse(validate.error.message) });
    }
    var { id } = req.params;
    var { id } = jsonStringToInt({ id });
    try {
      const result = await this.singleTaxModel.update({
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
    var { id } = req.params;
    var { id } = jsonStringToInt({ id });
    try {
      const result = await this.singleTaxModel.delete({ id });
      res.json(result);
    } catch (error) {
      const errorMessage = cleanErrorPrisma(error);
      res.status(404).json(errorMessage);
    }
  };
}
