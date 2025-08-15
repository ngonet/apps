import { prisma } from '../config/prisma-client.js';

const { healthPerson } = prisma;

export class HealthPersonModel {
  static async create({ input }) {
    return await healthPerson.create({
      data: { ...input },
    });
  }

  static async getAll() {
    return await healthPerson.findMany();
  }

  static async getById({ id }) {
    return await healthPerson.findUnique({
      where: {
        id: id,
      },
      include: {
        health: true,
        person: true,
      },
    });
  }

  static async getByPerson(person) {
    return await healthPerson.findUnique({
      where: {
        personId: person,
      },
      include: {
        health: true,
      },
    });
  }

  static async update({ id, input }) {
    return await healthPerson.update({
      where: {
        id: id,
      },
      data: { ...input },
    });
  }

  static async delete({ id }) {
    return await healthPerson.delete({
      where: {
        id: id,
      },
    });
  }
}
