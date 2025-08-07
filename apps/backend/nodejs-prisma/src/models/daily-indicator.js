import { prisma } from '../config/prisma-client.js';

const { dailyIndicator } = prisma;

export class DailyIndicatorModel {
  static async create({ input }) {
    return await dailyIndicator.create({
      data: { ...input },
    });
  }

  static async getAll() {
    return await dailyIndicator.findMany();
  }

  static async getById({ id }) {
    return await dailyIndicator.findUnique({
      where: {
        id: id,
      },
    });
  }

  static async getByDate(date) {
    return await dailyIndicator.findUnique({
      where: {
        date: date,
      },
    });
  }

  static async update({ id, input }) {
    return await dailyIndicator.update({
      where: {
        id: id,
      },
      data: { ...input },
    });
  }

  static async delete({ id }) {
    return await dailyIndicator.delete({
      where: {
        id: id,
      },
    });
  }
}
