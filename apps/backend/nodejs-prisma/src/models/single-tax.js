import { prisma } from '../config/prisma-client.js';

const { singleTax } = prisma;

export class SingleTaxModel {
  static async create({ input }) {
    return await singleTax.create({
      data: { ...input },
    });
  }

  static async getAll() {
    return await singleTax.findMany();
  }

  static async getById({ id }) {
    return await singleTax.findUnique({
      where: {
        id: id,
      },
    });
  }

  static async update({ id, input }) {
    return await singleTax.update({
      where: {
        id: id,
      },
      data: { ...input },
    });
  }

  static async getFactor(taxableBaseUtm) {
    return await singleTax.findMany({
      where: {
        AND: [
          {
            rentSince: {
              lte: parseInt(taxableBaseUtm),
            },
            rentUntil: {
              gte: parseInt(taxableBaseUtm),
            },
          },
        ],
      },
    });
  }

  static async delete({ id }) {
    return await singleTax.delete({
      where: {
        id: id,
      },
    });
  }
}
