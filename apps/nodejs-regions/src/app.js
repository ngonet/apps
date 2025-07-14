import fs from 'fs';
import https from 'https';
import express, { json, urlencoded } from 'express';
import { prisma } from './config/prisma-client.js';
import { corsMiddleware } from './middlewares/cors.js';
import { loggerMorgan } from './middlewares/morgan.js';
import { createCommuneRouter } from './routes/commune.routes.js';
import { createNodeJSMetricsRouter } from './routes/nodejs-metrics.routes.js';
import { createPrismaMetricsRouter } from './routes/prisma-metrics.routes.js';

export const createApp = async ({ communeModel }) => {
  const app = express();

  app.disable('x-powered-by');
  app.use(corsMiddleware());
  app.use(urlencoded({ extended: true }));
  app.use(json());

  if (environment === 'development' || environment === 'dev' || environment === 'local') {
    console.log("➡️ Configurando logger detallado (Morgan - dev)");
    app.use(loggerMorgan('dev'));
  } else {
    console.log("➡️ Configurando logger estándar (Morgan - combined)");
    app.use(loggerMorgan('combined'));
  }

  app.use('/nodejs', createNodeJSMetricsRouter());
  app.use('/prisma', createPrismaMetricsRouter());

  app.use('/api/commune', createCommuneRouter({ communeModel }));

  const httpsOptions = {
    key: fs.readFileSync('/certs/tls.key'),
    cert: fs.readFileSync('/certs/tls.crt'),
  };

  const server = https.createServer(httpsOptions, app).listen(process.env.PORT, () => {
    console.log('🔐 HTTPS server running on port:', process.env.PORT);
  });

  const close = () => {
    console.log('shutdown initiated...');
    server.close(() => {
      console.log('Server down');
      prisma.$disconnect;
      console.log('Prisma disconnect');
    });
  };

  process.on('SIGINT', close);
};
