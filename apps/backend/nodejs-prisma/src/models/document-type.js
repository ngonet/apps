import { prisma } from '../config/prisma-client.js';

const { documentType } = prisma;

export class DocumentTypeModel {
  static async getAll() {
    return await documentType.findMany();
  }

  static async getById({ id }) {
    return await documentType.findUnique({
      where: {
        id: id,
      },
    });
  }
}
