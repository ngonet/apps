import { prisma } from '../config/prisma-client.js';

const { section } = prisma;

export class SectionModel {
  static async getAll() {
    return await section.findMany();
  }

  static async getById({ id }) {
    return await section.findUnique({
      where: {
        id: id,
      },
    });
  }

  static async update({ id, input }) {
    return await section.update({
      where: {
        id: id,
      },
      data: { ...input },
    });
  }
}
