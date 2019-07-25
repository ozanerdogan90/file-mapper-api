import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as helmet from 'helmet';
import { corsMiddleware } from './cors';
import { errorMiddleware } from './error';
import { notfoundMiddleware } from './notfound';

// tslint:disable-next-line:typedef
export const middlewares = {
  applyBefore: [helmet(), bodyParser.json(), corsMiddleware, compression()],
  applyAfter: [errorMiddleware, notfoundMiddleware]
};
