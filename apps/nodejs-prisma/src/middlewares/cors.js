import cors from 'cors';

const ACCEPTED_ORIGINS = process.env.ACCEPTED_ORIGINS === '*' ? '*'
  : process.env.ACCEPTED_ORIGINS?.split(',') || [];

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) =>
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }

      if (acceptedOrigins === '*' || acceptedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error('No permitido por CORS'));
    },
    credentials: true,
  });
