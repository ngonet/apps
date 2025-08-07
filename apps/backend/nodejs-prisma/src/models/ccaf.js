import { prisma } from '../config/prisma-client.js';

const { ccaf } = prisma;

export class CcafModel {
  static async create({ input }) {
    return await ccaf.create({
      data: { ...input },
    });
  }

  static async getAll() {
    return await ccaf.findMany();
  }

  static async getById({ id }) {
    return await ccaf.findUnique({
      where: {
        id: id,
      },
    });
  }

  static async update({ id, input }) {
    return await ccaf.update({
      where: {
        id: id,
      },
      data: { ...input },
    });
  }

  static async delete({ id }) {
    return await ccaf.delete({
      where: {
        id: id,
      },
    });
  }
}
