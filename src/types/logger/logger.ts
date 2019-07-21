import * as winston from 'winston';
const logLevels: string[] = [
  'error',
  'warn',
  'info',
  'verbose',
  'debug',
  'silly'
];

function getLogLevel(): string {
  const logLevel: string = process.env.LOG_LEVEL;

  if (logLevel && logLevels.indexOf(logLevel) > -1) {
    return logLevel;
  }

  return 'info';
}

const logger: winston.Logger = winston.createLogger({
  level: getLogLevel(),
  format: winston.format.json(),
  transports: [new winston.transports.Console({ level: getLogLevel() })]
});

export default logger;
