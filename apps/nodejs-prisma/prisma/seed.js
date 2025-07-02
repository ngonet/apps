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

async function loadAfps(file) {
  const records = loadFileCSV(`${file}`);

  for await (const record of records) {
    const attr = record.split(',');

    const newAfp = await prisma.afp.upsert({
      where: { rut: attr[1] },
      update: {},
      create: {
        code: attr[0],
        rut: attr[1],
        name: attr[2],
        dependentRate: attr[3],
        independentRate: attr[4],
        sisRate: attr[5],
        since: new Date(Date.parse(attr[6])),
        until: new Date(Date.parse(attr[7])),
      },
    });
  }
}

async function loadDocumentType(file) {
  const records = loadFileCSV(`${file}`);

  for await (const record of records) {
    await prisma.documentType.upsert({
      where: { id: 0 },
      update: {},
      create: {
        name: record,
      },
    });
  }
}

async function loadHealth(file) {
  const records = loadFileCSV(`${file}`);

  for await (const record of records) {
    const attr = record.split(',');

    await prisma.health.upsert({
      where: { id: '' },
      update: {},
      create: {
        code: attr[0],
        rut: attr[1],
        name: attr[2],
      },
    });
  }
}

async function loadPositions(file) {
  const records = loadFileCSV(`${file}`);

  for await (const record of records) {
    const attr = record.split(',');

    const newPosition = await prisma.position.upsert({
      where: { id: 0 },
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
      where: { id: 0 },
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
      where: { id: 0 },
      update: {},
      create: {
        code: parseInt(attr[0]),
        name: attr[1],
      },
    });
  }
}

async function loadProvisionalIndicator(file) {
  const records = loadFileCSV(`${file}`);

  for await (const record of records) {
    const attr = record.split(',');

    await prisma.provisionalIndicator.upsert({
      where: { id: 0 },
      update: {},
      create: {
        date: new Date(attr[0]),
        maxTaxIncomeAFP: attr[1],
        maxTaxIncomeINP: attr[2],
        maxTaxIncomeAFC: attr[3],
        minTaxIncomeDepIndep: parseInt(attr[4]),
        minTaxIncomeSalaryGrade: parseInt(attr[5]),
        minTaxIncome1865: parseInt(attr[6]),
        minTaxIncomeNoRem: parseInt(attr[7]),
        minTaxIncomeDomesticWorker: parseInt(attr[8]),
        apvTopMonthly: parseInt(attr[9]),
        apvTopAnnual: parseInt(attr[10]),
        depositAgreementTopAnnual: parseInt(attr[11]),
        depositAgreementPrivateHome: parseInt(attr[12]),
      },
    });
  }
}

async function loadCompany(file) {
  const records = loadFileCSV(`${file}`);

  for await (const record of records) {
    const attr = record.split(',');

    await prisma.company.upsert({
      where: { id: '' },
      update: {},
      create: {
        id: attr[0],
        rut: attr[1],
        name: attr[2],
        address: attr[3],
        communeId: parseInt(attr[4]),
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
      where: { id: '' },
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

async function loadDailyIndicator(file) {
  const records = loadFileCSV(`${file}`);

  for await (const record of records) {
    const attr = record.split(',');

    await prisma.dailyIndicator.upsert({
      where: { id: 0 },
      update: {},
      create: {
        date: new Date(attr[0]),
        uf: parseFloat(attr[1]),
        utm: parseInt(attr[2]),
      },
    });
  }
}

async function loadSingleTax(file) {
  const records = loadFileCSV(`${file}`);

  for await (const record of records) {
    const attr = record.split(',');

    await prisma.singleTax.upsert({
      where: { id: 0 },
      update: {},
      create: {
        date: new Date(attr[0]),
        rentSince: parseFloat(attr[1]),
        rentUntil: parseFloat(attr[2]),
        factor: parseFloat(attr[3]),
        discount: parseFloat(attr[4]),
        rate: parseFloat(attr[5]),
      },
    });
  }
}

async function loadAfc(file) {
  const records = loadFileCSV(`${file}`);

  for await (const record of records) {
    const attr = record.split(',');

    await prisma.afc.upsert({
      where: { id: 0 },
      update: {},
      create: {
        date: new Date(attr[0]),
        cicIndefiniteEmployer: attr[1],
        cicIndefiniteWorker: attr[2],
        cicTemporaryEmployer: attr[3],
        cicTemporaryWorker: attr[4],
        cicHousekeeperEmployer: attr[5],
        cicHousekeeperWorker: attr[6],
        fcsIndefiniteEmployer: attr[7],
        fcsTemporaryEmployer: attr[8],
        fcsHousekeeperEmployer: attr[9],
        caiHousekeeperEmployer: attr[10],
      },
    });
  }
}

async function loadFamilyAllowance(file) {
  const records = loadFileCSV(`${file}`);

  for await (const record of records) {
    const attr = record.split(',');

    await prisma.familyAllowance.upsert({
      where: { id: 0 },
      update: {},
      create: {
        section: attr[0],
        amount: parseInt(attr[1]),
        rentSince: parseInt(attr[2]),
        rentUntil: parseInt(attr[3]),
        dateSince: new Date(attr[4]),
        dateUntil: new Date(attr[5]),
      },
    });
  }
}

async function loadCcafs(file) {
  const records = loadFileCSV(`${file}`);

  for await (const record of records) {
    const attr = record.split(',');

    const newCcaf = await prisma.ccaf.upsert({
      where: { id: 0 },
      update: {},
      create: {
        code: attr[0],
        rut: attr[1],
        name: attr[2],
        website: attr[3],
        rateCcaf: attr[4],
        rateFonasa: attr[5],
      },
    });
  }
}

async function main() {
  await loadRegions('regions');
  await loadAfps('afps');
  await loadDocumentType('documentTypes');
  await loadHealth('isapres', 1);
  await loadPositions('positions');
  await loadProvisionalIndicator('provisionalIndicator');
  await loadCompany('company');
  await loadRepresentative('representative');
  await loadDiscount('discount');
  await loadSalary('salary');
  await loadDailyIndicator('dailyIndicators');
  await loadSingleTax('singleTax');
  await loadAfc('afc');
  await loadFamilyAllowance('familyAllowance');
  await loadCcafs('ccafs');
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
