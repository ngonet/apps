import { prisma } from '../config/prisma-client.js';

const { document } = prisma;

export class DocumentModel {
  static async create({ input }) {
    return await document.create({
      data: { ...input },
    });
  }

  static async getAll() {
    return await document.findMany({
      include: {
        documentType: {
          select: {
            name: true,
          },
        },
        person: {
          select: {
            rut: true,
          },
        },
      },
    });
  }

  static async getAllByPersonId({ personId }) {
    return await document.findMany({
      where: {
        personId: personId,
      },
      include: {
        documentType: {
          select: {
            name: true,
          },
        },
        person: {
          select: {
            rut: true,
          },
        },
      },
    });
  }

  static async getById({ id }) {
    return await document.findUnique({
      where: {
        id: id,
      },
      include: {
        person: true,
        school: true,
        discountDocument: true,
        documentSalary: true,
      },
    });
  }

  static async update({ id, input }) {
    return await document.update({
      where: {
        id: id,
      },
      data: { ...input },
    });
  }

  static async delete({ id }) {
    return await document.delete({
      where: {
        id: id,
      },
    });
  }
}
