import { NextFunction, Request, Response } from 'express';
import * as correlator from 'express-correlation-id';
import { AppError } from '../types/error/app-error';
import logger from '../types/logger/logger';

export interface IErrorResult {
  ok: boolean;
  status: number;
  error: string;
  message: string;
  validationErrors?: object;
}

export function errorMiddleware(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  const result: IErrorResult = {
    ok: false,
    status: 500,
    error: error.constructor.name,
    message: error.message || 'Internal Server Error'
  };

  if (error instanceof AppError) {
    result.status = error.httpCode;
    result.error = error.name;
    result.message = error.description;
  } else {
    result.message = 'Internal Server Error';
  }


  logger.error(JSON.stringify({ error, cid: correlator.getId() }));

  response.setHeader('X-Correlation-Id', correlator.getId());
  response
    .status(result.status)
    .json(result)
    .end();
}
