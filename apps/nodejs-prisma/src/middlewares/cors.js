import cors from 'cors';

const ACCEPTED_ORIGINS = process.env.ACCEPTED_ORIGINS
  ? process.env.ACCEPTED_ORIGINS.split(',')
  : [];

const NODE_ENV = process.env.NODE_ENV || 'development';
const isDevelopment = NODE_ENV === 'development';

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) =>
  cors({
    origin: (origin, callback) => {
      // Permitir sin origin solo en desarrollo
      if (!origin && isDevelopment) {
        return callback(null, true);
      }

      if (acceptedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error('No permitido por CORS'));
    },
    credentials: true,
  });
