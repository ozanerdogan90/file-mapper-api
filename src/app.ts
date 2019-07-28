import * as express from 'express';
import * as path from 'path';
import 'reflect-metadata'; // We need this in order to use @Decorators
import { routings } from './components';
import { middlewares } from './middlewares';
import { authenticationMiddleware } from './middlewares/authentication';
import { validationMiddleware } from './middlewares/validation';
import { Action } from './types/endpoint/endpoint';
import { HttpStatusCodes } from './types/http/HttpStatusCodes';
import logger from './types/logger/logger';

export const app: express.Application = express();

app.use(middlewares.applyBefore);
app.use('/swagger', express.static(path.join(__dirname, '..', 'swagger')));

//// readiness and liveness for kubernetes k8s
app.get('/liveness', (req, res) => res.sendStatus(HttpStatusCodes.OK));
app.get('/readiness', (req, res) => res.sendStatus(HttpStatusCodes.OK));

routings.forEach(endpoint => {
  const { method, route, action, auth, schema } = endpoint;
  const middlewareList = [];

  if (auth !== false) {
    middlewareList.push(authenticationMiddleware);
  }
  if (schema) {
    middlewareList.push(validationMiddleware(schema));
  }

  middlewareList.push(injectAction(action));
  app[method](route, ...middlewareList);
});

export function injectAction(action: Action) {
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    Promise.resolve(action(req, res, next)).catch(error => next(error)); // handles promise rejection and passes the error on
  };
}

app.use(middlewares.applyAfter);
