import { Router } from 'express';
import { PrismaMetricsController } from '../controllers/prisma-metrics.js';

export const createPrismaMetricsRouter = () => {
  const metricsRouter = Router();
  const metricsController = new PrismaMetricsController();
  metricsRouter.get('/metrics', metricsController.metricsPrometheus);
  return metricsRouter;
};
