import { prisma } from '../config/prisma-client.js';

const { provisionalIndicator } = prisma;

export class ProvisionalIndicatorModel {
  static async create({ input }) {
    return await provisionalIndicator.create({
      data: { ...input },
    });
  }

  static async getAll() {
    return await provisionalIndicator.findMany();
  }

  static async getById({ id }) {
    return await provisionalIndicator.findUnique({
      where: {
        id: id,
      },
    });
  }

  static async getByDate(date) {
    return await provisionalIndicator.findUnique({
      where: {
        date: date,
      },
    });
  }

  static async update({ id, input }) {
    return await provisionalIndicator.update({
      where: {
        id: id,
      },
      data: { ...input },
    });
  }

  static async delete({ id }) {
    return await provisionalIndicator.delete({
      where: {
        id: id,
      },
    });
  }
}
