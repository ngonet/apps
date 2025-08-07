import { prisma } from '../config/prisma-client.js';

const { familyAllowance } = prisma;

export class FamilyAllowanceModel {
  static async create({ input }) {
    return await familyAllowance.create({
      data: { ...input },
    });
  }

  static async getAll() {
    return await familyAllowance.findMany();
  }

  static async getById({ id }) {
    return await familyAllowance.findUnique({
      where: {
        id: id,
      },
    });
  }

  static async update({ id, data }) {
    return await familyAllowance.update({
      where: {
        id: id,
      },
      data: { ...data },
    });
  }

  static async getBySalary(salary, date) {
    return await familyAllowance.findMany({
      where: {
        AND: [
          {
            rentSince: {
              lte: parseInt(salary),
            },
            rentUntil: {
              gte: parseInt(salary),
            },
          },
          {
            dateSince: {
              lte: new Date(date),
            },
            dateUntil: {
              gte: new Date(date),
            },
          },
        ],
      },
    });
  }

  static async delete({ id }) {
    return await familyAllowance.delete({
      where: {
        id: id,
      },
    });
  }
}
