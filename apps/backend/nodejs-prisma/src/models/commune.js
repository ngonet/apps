import { prisma } from '../config/prisma-client.js';

const { commune } = prisma;

export class CommuneModel {
  static async getAll() {
    return await commune.findMany();
  }

  static async getById({ id }) {
    return await commune.findUnique({
      where: {
        id: id,
      },
    });
  }
}
