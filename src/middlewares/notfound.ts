import { Request, Response } from 'express';
import { HttpStatusCodes } from '../types/http/HttpStatusCodes';

export function notfoundMiddleware(request: Request, response: Response) {
  response.status(HttpStatusCodes.NotFound).json({
    status: HttpStatusCodes.NotFound,
    message: `Resource "${request.path}" was not found.`
  });
}
