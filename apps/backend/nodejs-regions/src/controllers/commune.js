import { jsonStringToInt } from '../functions/utils/json-string-to-int.js';

export class CommuneController {
  constructor({ communeModel }) {
    this.communeModel = communeModel;
  }

  getAll = async (req, res) => {
    const result = await this.communeModel.getAll();
    if (!Object.keys(result).length) {
      res.status(404);
    }
    res.json(result);
  };

  getById = async (req, res) => {
    var { id } = req.params;
    var { id } = jsonStringToInt({ id });
    const result = await this.communeModel.getById({ id });
    if (!result) {
      res.status(404);
    }
    res.json(result);
  };
}
