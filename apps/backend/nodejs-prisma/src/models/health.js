import { prisma } from '../config/prisma-client.js';

const { health } = prisma;

export class HealthModel {
  static async create({ input }) {
    return await health.create({
      data: { ...input },
    });
  }

  static async getAll() {
    return await health.findMany();
  }

  static async getById({ id }) {
    return await health.findUnique({
      where: {
        id: id,
      },
    });
  }

  static async update({ id, input }) {
    return await health.update({
      where: {
        id: id,
      },
      data: { ...input },
    });
  }

  static async delete({ id }) {
    return await health.delete({
      where: {
        id: id,
      },
    });
  }
}
