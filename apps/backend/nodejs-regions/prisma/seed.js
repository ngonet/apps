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

async function loadRegions(file) {
  const records = loadFileCSV(`${file}`);

  for await (const record of records) {
    const attr = record.split(',');
    const region = {
      code: attr[0],
      name: attr[1],
      abbreviation: attr[2],
      province: {
        code: attr[3],
        name: attr[4],
        commune: {
          code: attr[5],
          name: attr[6],
        },
      },
    };

    const newRegion = await prisma.region.upsert({
      where: { code: attr[0] },
      update: {},
      create: {
        code: attr[0],
        name: attr[1],
        abbreviation: attr[2],
        provinces: {
          create: {
            code: attr[3],
            name: attr[4],
            communes: {
              create: {
                code: attr[5],
                name: attr[6],
              },
            },
          },
        },
      },
    });

    const newProvince = await prisma.province.upsert({
      where: { code: attr[3] },
      update: {},
      create: {
        code: attr[3],
        name: attr[4],
        regionId: newRegion.id,
        communes: {
          create: {
            code: attr[5],
            name: attr[6],
          },
        },
      },
    });

    await prisma.commune.upsert({
      where: { code: attr[5] },
      update: {},
      create: {
        code: attr[5],
        name: attr[6],
        provinceId: newProvince.id,
      },
    });
  }
}

async function main() {
  await loadRegions('regions');
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
