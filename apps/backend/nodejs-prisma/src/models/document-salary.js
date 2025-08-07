import { prisma } from '../config/prisma-client.js';

const { documentSalary } = prisma;

export class DocumentSalaryModel {
  static async create({ input }) {
    return await documentSalary.create({
      data: { ...input },
    });
  }

  static async getAll() {
    return await documentSalary.findMany();
  }

  static async getById({ id }) {
    return await documentSalary.findUnique({
      where: {
        id: id,
      },
    });
  }

  static async update({ id, input }) {
    return await documentSalary.update({
      where: {
        id: id,
      },
      data: { ...input },
    });
  }

  static async delete({ id }) {
    return await documentSalary.delete({
      where: {
        id: id,
      },
    });
  }
}
