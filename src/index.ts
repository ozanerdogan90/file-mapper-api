import * as express from 'express';
import * as path from 'path';
import Container from 'typedi';
import { Logger } from 'winston';
import { app } from './app';
import config from './config/env';

export const server: express.Application = app;

const logger: Logger = Container.get('logger');

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

server.use('/swagger', express.static(path.join(__dirname, '..', 'swagger')));

server.listen(config.port, (error: Error) => {
  if (error) {
    logger.error('Problem starting server', error);

    return;
  }

  logger.info(
    `server is listening on http://localhost:${config.port} in '${process.env.NODE_ENV}' mode`
  );
});
