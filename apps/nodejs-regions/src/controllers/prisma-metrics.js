import { prisma } from '../config/prisma-client.js';

export class PrismaMetricsController {
  metricsPrometheus = async (req, res) => {
    const metrics = await prisma.$metrics.prometheus();
    res.end(metrics);
  };
}
