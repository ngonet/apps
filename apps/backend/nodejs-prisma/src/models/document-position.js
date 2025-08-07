import { prisma } from '../config/prisma-client.js';

const { documentPosition } = prisma;

export class DocumentPositionModel {
  static async create({ input }) {
    return await documentPosition.create({
      data: { ...input },
    });
  }

  static async getAll() {
    return await documentPosition.findMany();
  }

  static async getById({ id }) {
    return await documentPosition.findUnique({
      where: {
        id: id,
      },
    });
  }

  static async update({ id, input }) {
    return await documentPosition.update({
      where: {
        id: id,
      },
      data: { ...input },
    });
  }

  static async delete({ id }) {
    return await documentPosition.delete({
      where: {
        id: id,
      },
    });
  }
}
