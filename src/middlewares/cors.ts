import { NextFunction, Request, Response } from 'express';
import { HttpStatusCodes } from '../types/http/http-status-code';

export function corsMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  response
    .append('Access-Control-Allow-Origin', '*')
    .append(
      'Access-Control-Allow-Headers',
      'Origin, Content-Type, Accept, Authorization'
    )
    .append(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, PATCH, DELETE, OPTIONS'
    )
    .append('Access-Control-Allow-Credentials', 'true');

  if (request.method === 'OPTIONS') {
    return response.sendStatus(HttpStatusCodes.OK);
  }
  next();
}
