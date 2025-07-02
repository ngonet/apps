import { prisma } from '../config/prisma-client.js';

const { afp } = prisma;

export class AfpModel {
  static async create({ input }) {
    return await afp.create({
      data: { ...input },
    });
  }

  static async getAll() {
    return await afp.findMany();
  }

  static async getById({ id }) {
    return await afp.findUnique({
      where: {
        id: id,
      },
    });
  }

  static async update({ id, input }) {
    return await afp.update({
      where: {
        id: id,
      },
      data: { ...input },
    });
  }

  static async delete({ id }) {
    return await afp.delete({
      where: {
        id: id,
      },
    });
  }
}
