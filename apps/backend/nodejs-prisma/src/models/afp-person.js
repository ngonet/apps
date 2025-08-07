import { prisma } from '../config/prisma-client.js';

const { afpPerson } = prisma;

export class AfpPersonModel {
  static async create({ input }) {
    return await afpPerson.create({
      data: { ...input },
    });
  }

  static async getAll() {
    return await afpPerson.findMany();
  }

  static async getById({ id }) {
    return await afpPerson.findUnique({
      where: {
        id: id,
      },
      include: {
        afp: true,
        person: true,
      },
    });
  }

  static async getByPerson(person) {
    return await afpPerson.findUnique({
      where: {
        personId: person,
      },
      include: {
        afp: true,
        //        person: true
      },
    });
  }

  static async update({ id, input }) {
    return await afpPerson.update({
      where: {
        id: id,
      },
      data: { ...input },
    });
  }

  static async delete({ id }) {
    return await afpPerson.delete({
      where: {
        id: id,
      },
    });
  }
}
