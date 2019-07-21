import { Request, Response } from 'express';

// tslint:disable-next-line:typedef
export function notfoundMiddleware(request: Request, response: Response) {
  response.status(404).json({
    status: 404,
    message: `Resource "${request.path}" was not found.`
  });
}
