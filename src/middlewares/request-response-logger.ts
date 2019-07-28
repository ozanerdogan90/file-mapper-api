import { NextFunction, Request, Response } from 'express';
import logger from '../types/logger/logger';

// tslint:disable: no-use-before-declare
export async function logRequestStartMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const startTime = Date.now();
  const cleanup = () => {
    res.removeListener('finish', logFn);
  };

  const logFn = () => {
    cleanup();
    const endTime = Date.now();
    logger.info(`${new Date().toISOString()} D:${endTime.valueOf() -
      startTime.valueOf()} ${req.method} ${req.originalUrl}
        ${res.statusCode} ${res.statusMessage}
        ${res.get('Content-Length') || 0}b sent`);
  };

  res.on('finish', logFn);

  next();
}
