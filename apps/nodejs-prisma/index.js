import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  try {
    // Upsert (crear o actualizar si existe)
    await prisma.user.upsert({
      where: { email: "alice@example.com" },
      update: {},
      create: { name: "Alice", email: "alice@example.com" }
    });

    await prisma.user.upsert({
      where: { email: "bob@example.com" },
      update: {},
      create: { name: "Bob", email: "bob@example.com" }
    });

    console.log("Datos inicializados correctamente");
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
