import * as express from 'express';
import { app } from './app';
import { connectDb } from './config/connection/connection';
import { Config } from './config/env';
import logger from './types/logger/logger';

export const server: express.Application = app;

function stop(error: Error): void {
  logger.error(
    'Unhandled exception of rejection happened' +
      (error && error.message ? `: ${error.message}` : ''),
    error
  );

  process.exit();
}

process.addListener('unhandledRejection', stop);
process.addListener('uncaughtException', stop);

// tslint:disable-next-line: no-floating-promises
connectDb().then(() => {
  server.listen(Config.port, (error: Error) => {
    if (error) {
      logger.error('Problem starting server', error);

      return;
    }

    logger.info(
      `server is listening on http://localhost:${Config.port} in '${process.env.NODE_ENV}' mode`
    );
  });
});
