import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as correlator from 'express-correlation-id';
import fileUpload = require('express-fileupload');
import * as helmet from 'helmet';
import { corsMiddleware } from './cors';
import { errorMiddleware } from './error';
import { notfoundMiddleware } from './notfound';
import { logRequestStartMiddleware } from './request-response-logger';

export const middlewares = {
  applyBefore: [
    helmet(),
    bodyParser.json(),
    bodyParser.urlencoded({
      extended: true
    }),
    corsMiddleware,
    compression(),
    logRequestStartMiddleware,
    fileUpload(),
    correlator()
  ],
  applyAfter: [errorMiddleware, notfoundMiddleware]
};
