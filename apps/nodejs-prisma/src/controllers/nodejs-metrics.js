import { collectDefaultMetrics, register } from 'prom-client';

collectDefaultMetrics();

export class NodeJSMetricsController {
  metricsPrometheus = async (req, res) => {
    try {
      res.set('Content-Type', register.contentType);
      res.end(await register.metrics());
    } catch (err) {
      res.status(500).end(err);
    }
  };
}
