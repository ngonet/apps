import express, { json, urlencoded } from 'express';
import { prisma } from './config/prisma-client.js';
import { PORT } from './config/process-env.js';
import { startCronJobs, stopCronJobs } from './jobs/cron.js';
import { corsMiddleware } from './middlewares/cors.js';
import { loggerMorgan } from './middlewares/morgan.js';
import { createAfcRouter } from './routes/afc.routes.js';
import { createAfpPersonRouter } from './routes/afp-person.routes.js';
import { createAfpRouter } from './routes/afp.routes.js';
import { createBurdenRouter } from './routes/burden.routes.js';
import { createCcafRouter } from './routes/ccaf.routes.js';
import { createCommuneRouter } from './routes/commune.routes.js';
import { createCompanyRouter } from './routes/company.routes.js';
import { createDailyIndicatorRouter } from './routes/daily-indicator.routes.js';
import { createDiscountDocumentRouter } from './routes/discount-document.routes.js';
import { createDiscountRemunerationRouter } from './routes/discount-remuneration.routes.js';
import { createDiscountRouter } from './routes/discount.routes.js';
import { createDocumentPositionRouter } from './routes/document-position.routes.js';
import { createDocumentSalaryRouter } from './routes/document-salary.routes.js';
import { createDocumentTypeRouter } from './routes/document-type.routes.js';
import { createDocumentRouter } from './routes/document.routes.js';
import { createFamilyAllowanceRouter } from './routes/family-allowance.routes.js';
import { createHealthPersonRouter } from './routes/health-person.routes.js';
import { createHealthRouter } from './routes/health.routes.js';
import { createNodeJSMetricsRouter } from './routes/nodejs-metrics.routes.js';
import { createPersonRouter } from './routes/person.routes.js';
import { createPositionRouter } from './routes/position.routes.js';
import { createPrismaMetricsRouter } from './routes/prisma-metrics.routes.js';
import { createProvisionalIndicatorRouter } from './routes/provisional-indicator.routes.js';
import { createRemunerationSalaryRouter } from './routes/remuneration-salary.routes.js';
import { createRemunerationRouter } from './routes/remuneration.routes.js';
import { createRepresentativeRouter } from './routes/representative.routes.js';
import { createSalaryRouter } from './routes/salary.routes.js';
import { createSectionRouter } from './routes/section.routes.js';
import { createSingleTaxRouter } from './routes/single-tax.routes.js';

export const createApp = async (
  { communeModel },
  { personModel },
  { healthModel },
  { afpModel },
  { healthPersonModel },
  { afpPersonModel },
  { companyModel },
  { representativeModel },
  { documentTypeModel },
  { documentModel },
  { positionModel },
  { documentPositionModel },
  { remunerationModel },
  { discountModel },
  { discountRemunerationModel },
  { salaryModel },
  { remunerationSalaryModel },
  { dailyIndicatorModel },
  { singleTaxModel },
  { provisionalIndicatorModel },
  { sectionModel },
  { burdenModel },
  { afcModel },
  { familyAllowanceModel },
  { ccafModel },
  { discountDocumentModel },
  { documentSalaryModel }
) => {
  const app = express();

  app.disable('x-powered-by');
  app.use(corsMiddleware());
  app.use(urlencoded({ extended: true }));
  app.use('/nodejs', createNodeJSMetricsRouter());
  app.use('/prisma', createPrismaMetricsRouter());
  app.use(json());
  app.use(loggerMorgan);

  app.use('/api/commune', createCommuneRouter({ communeModel }));
  app.use('/api/person', createPersonRouter({ personModel }));
  app.use('/api/health', createHealthRouter({ healthModel }));
  app.use('/api/afp', createAfpRouter({ afpModel }));
  app.use('/api/health-person', createHealthPersonRouter({ healthPersonModel }));
  app.use('/api/afp-person', createAfpPersonRouter({ afpPersonModel }));
  app.use('/api/company', createCompanyRouter({ companyModel }));
  app.use('/api/representative', createRepresentativeRouter({ representativeModel }));
  app.use('/api/document-type', createDocumentTypeRouter({ documentTypeModel }));
  app.use('/api/document', createDocumentRouter({ documentModel }));
  app.use('/api/position', createPositionRouter({ positionModel }));
  app.use('/api/document-position', createDocumentPositionRouter({ documentPositionModel }));
  app.use('/api/remuneration', createRemunerationRouter({ remunerationModel }));
  app.use('/api/discount', createDiscountRouter({ discountModel }));
  app.use(
    '/api/discount-remuneration',
    createDiscountRemunerationRouter({ discountRemunerationModel })
  );
  app.use('/api/salary', createSalaryRouter({ salaryModel }));
  app.use('/api/remuneration-salary', createRemunerationSalaryRouter({ remunerationSalaryModel }));
  app.use('/api/daily-indicator', createDailyIndicatorRouter({ dailyIndicatorModel }));
  app.use('/api/single-tax', createSingleTaxRouter({ singleTaxModel }));
  app.use(
    '/api/provisional-indicator',
    createProvisionalIndicatorRouter({ provisionalIndicatorModel })
  );
  app.use('/api/section', createSectionRouter({ sectionModel }));
  app.use('/api/burden', createBurdenRouter({ burdenModel }));
  app.use('/api/afc', createAfcRouter({ afcModel }));
  app.use('/api/family-allowance', createFamilyAllowanceRouter({ familyAllowanceModel }));
  app.use('/api/ccaf', createCcafRouter({ ccafModel }));
  app.use('/api/discount-document', createDiscountDocumentRouter({ discountDocumentModel }));
  app.use('/api/document-salary', createDocumentSalaryRouter({ documentSalaryModel }));

  startCronJobs();

  const server = app.listen(PORT, () => {
    try {
      console.log('Server on port:', PORT);
    } catch (error) {
      console.log(error);
    }
  });

  const close = () => {
    console.log('shutdown initiated...');
    stopCronJobs();
    server.close(() => {
      console.log('Server down');
      prisma.$disconnect;
      console.log('Prisma disconnect');
    });
  };

  process.on('SIGINT', close);
};
