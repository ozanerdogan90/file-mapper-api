import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';

import { errorMiddleware } from './error';
import { corsMiddleware } from './cors';
import { notfoundMiddleware } from './notfound';

// tslint:disable-next-line:typedef
export const middlewares = {
  applyBefore: [helmet(), bodyParser.json(), corsMiddleware],
  applyAfter: [errorMiddleware, notfoundMiddleware]
};