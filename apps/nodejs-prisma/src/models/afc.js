import { prisma } from '../config/prisma-client.js';

const { afc } = prisma;

export class AfcModel {
  static async create({ input }) {
    return await afc.create({
      data: { ...input },
    });
  }

  static async getAll() {
    return await afc.findMany();
  }

  static async getById({ id }) {
    return await afc.findUnique({
      where: {
        id: id,
      },
    });
  }

  static async getByDate(date) {
    return await afc.findUnique({
      where: {
        date: date,
      },
    });
  }

  static async update({ id, input }) {
    return await afc.update({
      where: {
        id: id,
      },
      data: { ...input },
    });
  }

  static async delete({ id }) {
    return await afc.delete({
      where: {
        id: id,
      },
    });
  }
}
