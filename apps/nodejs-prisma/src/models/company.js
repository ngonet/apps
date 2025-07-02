import { prisma } from '../config/prisma-client.js';

const { company } = prisma;

export class CompanyModel {
  static async getAll() {
    return await company.findMany();
  }

  static async getById({ id }) {
    return await company.findUnique({
      where: {
        id: id,
      },
      include: {
        commune: true,
      },
    });
  }

  static async update({ id, input }) {
    return await company.update({
      where: {
        id: id,
      },
      data: { ...input },
    });
  }
}
