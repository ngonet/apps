import morgan from 'morgan';
import { logger } from '../config/logger.js';

const jsonFormat = [
  ':method',
  ':url',
  ':status',
  ':res[content-length]',
  ':response-time',
].join(' ');

export const loggerMorgan = (format = jsonFormat) =>
  morgan(format, {
    stream: {
      write: (message) => {
        const parts = message.trim().split(' ');

        const logEntry = {
          method: parts[0],
          url: parts[1],
          status: parseInt(parts[2], 10),
          contentLength: parts[3] !== '-' ? Number(parts[3]) : null,
          responseTimeMs: parseFloat(parts[4]),
          timestamp: new Date().toISOString(),
        };

        logger.info(logEntry); // Si logger soporta objetos
        // logger.info(JSON.stringify(logEntry)); // Si requiere string
      },
    },
  });

