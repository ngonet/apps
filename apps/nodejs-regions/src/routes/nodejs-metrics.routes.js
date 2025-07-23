import { Router } from 'express';
import { NodeJSMetricsController } from '../controllers/nodejs-metrics.js';

export const createNodeJSMetricsRouter = () => {
  const metricsRouter = Router();
  const metricsController = new NodeJSMetricsController();
  metricsRouter.get('/metrics', metricsController.metricsPrometheus);
  return metricsRouter;
};
