import { cleanErrorPrisma } from '../functions/utils/clean-error-message.js';
import { jsonStringToInt } from '../functions/utils/json-string-to-int.js';
import { validateSection, validatePartialSection } from '../schemas/section.js';

export class SectionController {
  constructor({ sectionModel }) {
    this.sectionModel = sectionModel;
  }

  getAll = async (req, res) => {
    const result = await this.sectionModel.getAll();
    if (!Object.keys(result).length) {
      res.status(404);
    }
    res.json(result);
  };

  getById = async (req, res) => {
    var { id } = req.params;
    var { id } = jsonStringToInt({ id });
    const result = await this.sectionModel.getById({ id });
    if (!result) {
      res.status(404);
    }
    res.json(result);
  };

  update = async (req, res) => {
    const validate = validatePartialSection(req.body);
    if (!validate.success) {
      return res.status(422).json({ error: JSON.parse(validate.error.message) });
    }
    const { id } = req.params;
    try {
      const result = await this.sectionModel.update({
        id,
        input: validate.data,
      });
      res.json(result);
    } catch (error) {
      const errorMessage = cleanErrorPrisma(error);
      res.status(404).json(errorMessage);
    }
  };
}
