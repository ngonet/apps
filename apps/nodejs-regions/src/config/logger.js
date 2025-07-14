import { createLogger, format, transports } from 'winston';
import { NODE_ENV } from './process-env.js';

const { combine, timestamp, json } = format;

// Custom format for console logging with colors
// const consoleLogFormat = format.combine(
//  format.printf(({ level, message, timestamp }) => {
//    return `${level}: ${message}`;
//  })

// );

// Create a Winston logger
export const logger = createLogger({
  level: 'info',
  format: combine(timestamp(), json()),
  transports: [
    new transports.File({ filename: './log/error.log', level: 'error' }),
    new transports.File({ filename: './log/info.log' }),
  ],
});

function getCallerInfo() {
  const { stack } = new Error();
  const stackLines = stack.split('\n');
  const callerLine = stackLines[3];
  const match = callerLine.match(/\(([^)]+)\)/);
  return match ? match[1] : 'unknown';
}

export const logWithContext = (level, message) => {
  const callerInfo = getCallerInfo();
  logger.log({
    level: level,
    message: message,
    context: callerInfo,
  });
};

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.simple(),
    })
    //    new transports.Console({
    //      format: consoleLogFormat,
    //      level: "error",
    //    }),
  );
}
