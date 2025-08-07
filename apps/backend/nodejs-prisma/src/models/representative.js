import { prisma } from '../config/prisma-client.js';

const { representative } = prisma;

export class RepresentativeModel {
  static async create({ input }) {
    return await representative.create({
      data: { ...input },
    });
  }

  static async getAll() {
    return await representative.findMany();
  }

  static async getById({ id }) {
    return await representative.findUnique({
      where: {
        companyId: id,
      },
    });
  }

  static async update({ id, input }) {
    return await representative.update({
      where: {
        id: id,
      },
      data: { ...input },
    });
  }

  static async delete({ id }) {
    return await representative.delete({
      where: {
        id: id,
      },
    });
  }
}
