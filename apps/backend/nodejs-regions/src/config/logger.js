import { createLogger, format, transports } from 'winston';
import path from 'path';

const { combine, timestamp, printf, colorize, json, errors, splat } = format;

// 🧠 Pretty console output for development
const devConsoleFormat = combine(
  colorize(),
  timestamp(),
  splat(),
  printf(({ level, message, timestamp, context, ...meta }) => {
    const base = `${timestamp} [${level}]${context ? ` (${context})` : ''}: ${message}`;
    const metaString = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
    return base + metaString;
  })
);

// 📦 Persistent JSON logs (useful for log aggregators like ELK, Loki, etc.)
const prodFileFormat = combine(
  timestamp(),
  errors({ stack: true }),
  splat(),
  json()
);

// 🚀 Winston Logger instance
export const logger = createLogger({
  level: 'info',
  format: prodFileFormat,
  transports: [
    new transports.File({ filename: './log/error.log', level: 'error' }),
    new transports.File({ filename: './log/info.log', level: 'info' }),
  ],
});

// 🧠 Attach context (caller file + line) for deeper traceability
function getCallerInfo() {
  const originalStackTrace = new Error().stack;
  const stackLines = originalStackTrace?.split('\n') ?? [];

  // Skip first few lines (Error, current func, winston internals)
  const relevantLine = stackLines[3] || '';
  const match = relevantLine.match(/\((.*):(\d+):(\d+)\)/);
  if (match) {
    const [, filePath, line, column] = match;
    return `${path.basename(filePath)}:${line}:${column}`;
  }
  return 'unknown';
}

// 🎯 Optional logging helper with context
export const logWithContext = (level, message, meta = {}) => {
  const context = getCallerInfo();
  logger.log({
    level,
    message,
    context,
    ...meta,
  });
};

// 🖥 Console output only in non-production
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: devConsoleFormat,
    })
  );
}

