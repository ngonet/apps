import { prisma } from '../config/prisma-client.js';

const { burden } = prisma;

export class BurdenModel {
  static async create({ input }) {
    return await burden.create({
      data: { ...input },
    });
  }

  static async getAll() {
    return await burden.findMany();
  }

  static async getById({ id }) {
    return await burden.findUnique({
      where: {
        id: id,
      },
    });
  }

  static async getByPerson(person) {
    return await burden.count({
      where: {
        personId: person,
      },
    });
  }

  static async update({ id, input }) {
    return await burden.update({
      where: {
        id: id,
      },
      data: { ...input },
    });
  }

  static async delete({ id }) {
    return await burden.delete({
      where: {
        id: id,
      },
    });
  }
}
