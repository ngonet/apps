import { prisma } from '../config/prisma-client.js';

const { salary } = prisma;

export class SalaryModel {
  static async create({ input }) {
    return await salary.create({
      data: { ...input },
    });
  }

  static async getAll() {
    return await salary.findMany();
  }

  static async getById({ id }) {
    return await salary.findUnique({
      where: {
        id: id,
      },
    });
  }

  static async update({ id, input }) {
    return await salary.update({
      where: {
        id: id,
      },
      data: { ...input },
    });
  }

  static async delete({ id }) {
    return await salary.delete({
      where: {
        id: id,
      },
    });
  }
}
