import * as express from 'express';
import * as path from 'path';
import { Application } from 'express-serve-static-core';
import { app } from './app';
import Container from 'typedi';

export const server: Application = app;

const logger: any = Container.get('logger');

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

const port: number = parseInt(process.env.PORT, 10) || 3000;

server.listen(port, (error: Error) => {
  if (error) {
    logger.error('Problem starting server', error);

    return;
  }

  logger.info(
    `server is listening on http://localhost:${port} in '${process.env.NODE_ENV}' mode`
  );
});
