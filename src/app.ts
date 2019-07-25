import * as express from 'express';
import 'reflect-metadata'; // We need this in order to use @Decorators
import Container from 'typedi';
import { HttpStatusCodes } from './types/http/HttpStatusCodes';
import logger from './types/logger/logger';

export const app: express.Application = express();


Container.set('logger', logger);

//// readiness and liveness for kubernetes k8s
app.get('/liveness', (req, res) => res.sendStatus(HttpStatusCodes.OK));
app.get('/readiness', (req, res) => res.sendStatus(HttpStatusCodes.OK));
