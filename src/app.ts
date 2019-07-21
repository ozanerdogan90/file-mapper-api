import * as express from 'express';
import Container from 'typedi';
import logger from './types/logger/logger';
import 'reflect-metadata'; // We need this in order to use @Decorators

export const app: express.Application = express();

Container.set('logger', logger);

//// readiness and liveness for kubernetes k8s
app.get('/liveness', (req, res) => res.sendStatus(200));
app.get('/readiness', (req, res) => res.sendStatus(200));
