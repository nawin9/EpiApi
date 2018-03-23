import Koa from 'koa';
import BodyParser from 'koa-bodyparser';
import Cors from 'kcors';
import mongoose from 'mongoose';
import socketIO from 'socket.io';
import http from 'http';

import config from './config';
import apm from './apm';
import logger from './logger';
import errorHandler from './middlewares/errorHandler';
import logMiddleware from './middlewares/log';
import requestId from './middlewares/requestId';
import responseHandler from './middlewares/responseHandler';

import publicRouter from './routes/publicRoutes';
import securedRouter from './routes/securedRoutes';
import swaggerWrapper from './utils/swagger-app-wrapper';

import socket from './controllers/socket';

const app = new Koa();

// Trust proxy
app.proxy = true;

// Set middlewares
app.use(
  BodyParser({
    enableTypes: ['json', 'form'],
    formLimit: '10mb',
    jsonLimit: '10mb',
  })
);
app.use(requestId());
app.use(
  Cors({
    origin: '*',
    allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
    exposeHeaders: ['X-Request-Id'],
  })
);
app.use(responseHandler());
app.use(errorHandler());
app.use(logMiddleware({ logger }));
swaggerWrapper(app);

const connString = 'mongodb://localhost:27017/api';
mongoose.connect(connString);
mongoose.connection.on('connected', () => {
  console.log(`Mongoose default connection open to ${connString}`);
});
mongoose.connection.on('error', err => {
  console.log(`Mongoose default connection error: ${err}`);
});
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection disconnected');
});
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection closed through app termination');
    process.exit(0);
  });
});

// Bootstrap application router
app.use(publicRouter.routes()).use(publicRouter.allowedMethods());
app.use(securedRouter.routes()).use(securedRouter.allowedMethods());

const onError = err => {
  if (apm.active) apm.captureError(err);
  logger.error({ err, event: 'error' }, 'Unhandled exception occured');
};

// Handle uncaught errors
app.on('error', onError);

// Start server
if (!module.parent) {
  app
    .listen(config.port, config.host, () => {
      logger.info({ event: 'execute' }, `API server is listening on ${config.host}:${config.port}, in ${config.env}`);
    })
    .on('error', onError);
}

// Socket IO
const server = http.createServer(app.callback());
const io = socketIO(server);
socket.ioHandler(io);
server.listen(3003, () => {
  logger.info({ event: 'execute' }, 'Socket server is listening on localhost:3003');
});

// Expose app
export default app;
