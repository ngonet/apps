import { prisma } from '../config/prisma-client.js';

const { discount } = prisma;

export class DiscountModel {
  static async create({ input }) {
    return await discount.create({
      data: { ...input },
    });
  }

  static async getAll() {
    return await discount.findMany();
  }

  static async getById({ id }) {
    return await discount.findUnique({
      where: {
        id: id,
      },
    });
  }

  static async update({ id, input }) {
    return await discount.update({
      where: {
        id: id,
      },
      data: { ...input },
    });
  }

  static async delete({ id }) {
    return await discount.delete({
      where: {
        id: id,
      },
    });
  }
}
