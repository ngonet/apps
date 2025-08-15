import { prisma } from '../config/prisma-client.js';

const { position } = prisma;

export class PositionModel {
  static async create({ input }) {
    return await position.create({
      data: { ...input },
    });
  }

  static async getAll() {
    return await position.findMany();
  }

  static async getAllParent() {
    return await position.findMany({
      where: {
        parentId: null,
      },
    });
  }

  static async getById({ id }) {
    return await position.findUnique({
      where: {
        id: id,
      },
    });
  }

  static async update({ id, input }) {
    return await position.update({
      where: {
        id: id,
      },
      data: { ...input },
    });
  }

  static async delete({ id }) {
    return await position.delete({
      where: {
        id: id,
      },
    });
  }
}
