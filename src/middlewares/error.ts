import { NextFunction, Request, Response } from 'express';
import { AppError } from '../types/error/app-error';
import { Container } from 'typedi';
import { Logger } from '../types/logger/logger';

export interface ErrorResult {
  ok: boolean;
  status: number;
  error: string;
  message: string;
  validationErrors?: object;
}

// tslint:disable-next-line:typedef
export function errorMiddleware(
  error: any,
  request: Request,
  response: Response,
  next: NextFunction
) {
  const logger: Logger = Container.get('logger');
  const result: ErrorResult = {
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
    // This is some type of error that we don't expect!
    // Hide the messy message from outside and just log it!
    result.message = 'Internal Server Error';
  }

  logger.error(JSON.stringify(error));

  response
    .status(result.status)
    .json(result)
    .end();
}
