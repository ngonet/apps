import { prisma } from '../config/prisma-client.js';

const { remuneration } = prisma;

export class RemunerationModel {
  static async create({ input }) {
    return await remuneration.create({
      data: { ...input },
    });
  }

  static async getAll() {
    return await remuneration.findMany();
  }

  static async getById({ id }) {
    return await remuneration.findUnique({
      where: {
        id: id,
      },
      include: {
        remunerationSalary: true,
        discountRemuneration: true,
      },
    });
  }

  static async update({ id, input }) {
    return await remuneration.update({
      where: {
        id: id,
      },
      data: { ...input },
    });
  }

  static async delete({ id }) {
    return await remuneration.delete({
      where: {
        id: id,
      },
    });
  }
}
