import { prisma } from '../config/prisma-client.js';

const { person } = prisma;

export class PersonModel {
  static async create({ input }) {
    return await person.create({
      data: { ...input },
    });
  }

  static async getAll() {
    return await person.findMany();
  }

  static async getById({ id }) {
    return await person.findUnique({
      where: {
        id: id,
      },
      include: {
        commune: {
          include: {
            province: true,
          },
        },
        burden: true,
        afpPerson: {
          include: { afp: true },
        },
        healthPerson: {
          include: { health: true },
        },
        document: {
          include: { remuneration: true },
        },
      },
    });
  }

  static async update({ id, input }) {
    return await person.update({
      where: {
        id: id,
      },
      data: { ...input },
    });
  }

  static async delete({ id }) {
    return await person.delete({
      where: {
        id: id,
      },
    });
  }
}
