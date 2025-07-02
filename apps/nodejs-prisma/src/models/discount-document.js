import { prisma } from '../config/prisma-client.js';

const { discountDocument } = prisma;

export class DiscountDocumentModel {
  static async create({ input }) {
    return await discountDocument.create({
      data: { ...input },
    });
  }

  static async getAll() {
    return await discountDocument.findMany();
  }

  static async getById({ id }) {
    return await discountDocument.findUnique({
      where: {
        id: id,
      },
    });
  }

  static async update({ id, input }) {
    return await discountDocument.update({
      where: {
        id: id,
      },
      data: { ...input },
    });
  }

  static async delete({ id }) {
    return await discountDocument.delete({
      where: {
        id: id,
      },
    });
  }
}
