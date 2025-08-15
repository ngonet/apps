import { createReadStream } from 'fs';
import { createInterface } from 'readline';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function loadFileCSV(file) {
  const records = createInterface({
    input: createReadStream(`./prisma/seeds/${file}.csv`),
  });

  return records;
}

const normalize = (value) => {
  return value === 'NULL' || value === '' ? null : parseInt(value);
};

async function loadDocumentType(file) {
  const records = loadFileCSV(`${file}`);

  for await (const record of records) {
    const attr = record.split(',');

    await prisma.documentType.upsert({
      where: { code: attr[1] },
      update: {},
      create: {
        id: parseInt(attr[0]),
        code: attr[1],
        name: attr[2],
        parentId: normalize(attr[3]),
      },
    });
  }
}

async function loadPositions(file) {
  const records = loadFileCSV(`${file}`);

  for await (const record of records) {
    const attr = record.split(',');

    const newPosition = await prisma.position.upsert({
      where: { code: attr[1] },
      update: {},
      create: {
        code: attr[1],
        name: attr[0],
      },
    });
  }
}

async function loadDiscount(file) {
  const records = loadFileCSV(`${file}`);

  for await (const record of records) {
    const attr = record.split(',');

    await prisma.discount.upsert({
      where: { code: attr[0] },
      update: {},
      create: {
        code: attr[0],
        name: attr[1],
      },
    });
  }
}

async function loadSalary(file) {
  const records = loadFileCSV(`${file}`);

  for await (const record of records) {
    const attr = record.split(',');

    await prisma.salary.upsert({
      where: { code: parseInt(attr[0]) },
      update: {},
      create: {
        code: parseInt(attr[0]),
        name: attr[1],
      },
    });
  }
}

async function loadCompany(file) {
  const records = loadFileCSV(`${file}`);

  for await (const record of records) {
    const attr = record.split(',');

    await prisma.company.upsert({
      where: { id: attr[0] },
      update: {},
      create: {
        id: attr[0],
        rut: attr[1],
        name: attr[2],
        address: attr[3],
        commune: attr[4],
        phone: attr[5],
        email: attr[6],
      },
    });
  }
}

async function loadRepresentative(file) {
  const records = loadFileCSV(`${file}`);

  for await (const record of records) {
    const attr = record.split(',');

    await prisma.representative.upsert({
      where: { rut: attr[1] },
      update: {},
      create: {
        companyId: attr[0],
        rut: attr[1],
        firstName: attr[2],
        firstSurname: attr[3],
        secondSurname: attr[4],
        phone: attr[5],
        email: attr[6],
      },
    });
  }
}

async function main() {
  await loadDocumentType('documentTypes');
  await loadPositions('positions');
  await loadCompany('company');
  await loadRepresentative('representative');
  await loadDiscount('discount');
  await loadSalary('salary');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
