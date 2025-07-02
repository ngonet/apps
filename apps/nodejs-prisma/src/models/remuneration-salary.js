import { prisma } from '../config/prisma-client.js';

const { remunerationSalary } = prisma;

export class RemunerationSalaryModel {
  static async create({ input }) {
    return await remunerationSalary.create({
      data: { ...input },
    });
  }

  static async getAll() {
    return await remunerationSalary.findMany();
  }

  static async getById({ id }) {
    return await remunerationSalary.findUnique({
      where: {
        id: id,
      },
    });
  }

  static async update({ id, input }) {
    return await remunerationSalary.update({
      where: {
        id: id,
      },
      data: { ...input },
    });
  }

  static async delete({ id }) {
    return await remunerationSalary.delete({
      where: {
        id: id,
      },
    });
  }
}
