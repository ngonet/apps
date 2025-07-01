import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    await Promise.all([
      prisma.user.upsert({
        where: { email: "alice@example.com" },
        update: {},
        create: { name: "Alice", email: "alice@example.com" }
      }),
      prisma.user.upsert({
        where: { email: "bob@example.com" },
        update: {},
        create: { name: "Bob", email: "bob@example.com" }
      })
    ]);

    console.log("Datos iniciales cargados correctamente.");
  } catch (error) {
    console.error("Error al cargar datos:", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();

