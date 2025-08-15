import fs from 'fs';
import https from 'https';
import express, { json, urlencoded } from 'express';
import { prisma } from './config/prisma-client.js';
import { PORT } from './config/process-env.js';
import { startCronJobs, stopCronJobs } from './jobs/cron.js';
import { corsMiddleware } from './middlewares/cors.js';
import { loggerMorgan } from './middlewares/morgan.js';
import { createAfpPersonRouter } from './routes/afp-person.routes.js';
import { createBurdenRouter } from './routes/burden.routes.js';
import { createCompanyRouter } from './routes/company.routes.js';
import { createDiscountDocumentRouter } from './routes/discount-document.routes.js';
import { createDiscountRemunerationRouter } from './routes/discount-remuneration.routes.js';
import { createDiscountRouter } from './routes/discount.routes.js';
import { createDocumentPositionRouter } from './routes/document-position.routes.js';
import { createDocumentSalaryRouter } from './routes/document-salary.routes.js';
import { createDocumentTypeRouter } from './routes/document-type.routes.js';
import { createDocumentRouter } from './routes/document.routes.js';
import { createHealthPersonRouter } from './routes/health-person.routes.js';
import { createNodeJSMetricsRouter } from './routes/nodejs-metrics.routes.js';
import { createPersonRouter } from './routes/person.routes.js';
import { createPositionRouter } from './routes/position.routes.js';
import { createPrismaMetricsRouter } from './routes/prisma-metrics.routes.js';
import { createRemunerationSalaryRouter } from './routes/remuneration-salary.routes.js';
import { createRemunerationRouter } from './routes/remuneration.routes.js';
import { createRepresentativeRouter } from './routes/representative.routes.js';
import { createSalaryRouter } from './routes/salary.routes.js';

export const createApp = async (
  { personModel },
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
  { burdenModel },
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

  app.use('/api/person', createPersonRouter({ personModel }));
  app.use('/api/burden', createBurdenRouter({ burdenModel }));
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
  app.use('/api/discount-document', createDiscountDocumentRouter({ discountDocumentModel }));
  app.use('/api/document-salary', createDocumentSalaryRouter({ documentSalaryModel }));

  startCronJobs();

  //  const server = app.listen(PORT, () => {
  //    try {
  //      console.log('Server on port:', PORT);
  //    } catch (error) {
  //      console.log(error);
  //    }
  //  });

  const httpsOptions = {
    key: fs.readFileSync('/certs/tls.key'),
    cert: fs.readFileSync('/certs/tls.crt'),
  };

  const server = https.createServer(httpsOptions, app).listen(PORT, () => {
    console.log('🔐 HTTPS server running on port:', PORT);
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
