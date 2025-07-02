import { prisma } from '../config/prisma-client.js';

const { discountRemuneration } = prisma;

export class DiscountRemunerationModel {
  static async create({ input }) {
    return await discountRemuneration.create({
      data: { ...input },
    });
  }

  static async getAll() {
    return await discountRemuneration.findMany();
  }

  static async getById({ id }) {
    return await discountRemuneration.findUnique({
      where: {
        id: id,
      },
    });
  }

  static async update({ id, input }) {
    return await discountRemuneration.update({
      where: {
        id: id,
      },
      data: { ...input },
    });
  }

  static async delete({ id }) {
    return await discountRemuneration.delete({
      where: {
        id: id,
      },
    });
  }
}
