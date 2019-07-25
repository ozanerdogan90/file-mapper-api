import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Logger } from 'winston';
import { AppError } from '../types/error/app-error';

export interface IErrorResult {
  ok: boolean;
  status: number;
  error: string;
  message: string;
  validationErrors?: object;
}

// tslint:disable-next-line:typedef
export function errorMiddleware(
  // tslint:disable-next-line: no-any
  error: any,
  request: Request,
  response: Response,
  next: NextFunction
) {
  const logger: Logger = Container.get('logger');
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

  logger.error(JSON.stringify(error));

  response
    .status(result.status)
    .json(result)
    .end();
}
