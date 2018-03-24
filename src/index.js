import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from 'kcors';
import logger from 'koa-pino-logger';
import mongoose from 'mongoose';
import socketIO from 'socket.io';

import config from './config';
import apm from './apm';
import errorHandler from './middlewares/errorHandler';
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
app.silent = true;
const pino = logger();
app.use(pino);
app.use(
  bodyParser({
    enableTypes: ['json', 'form'],
    formLimit: '10mb',
    jsonLimit: '10mb',
  })
);
app.use(requestId());
app.use(
  cors({
    origin: '*',
    allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
    exposeHeaders: ['X-Request-Id'],
  })
);
app.use(responseHandler());
app.use(errorHandler());
swaggerWrapper(app);

const connString = 'mongodb://epiapi_db_1:27017/api';
// const connString = 'mongodb://localhost:27017/api';
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
  console.log('Unhandled exception occured');
};

// Handle uncaught errors
app.on('error', onError);

// Start server
if (!module.parent) {
  const koaServer = app.listen(config.port, config.host, () => {
    console.log(`API server is listening on ${config.host}:${config.port}, in ${config.env}`);
  });
  koaServer.on('error', onError);

  // Socket IO
  const io = socketIO.listen(koaServer);
  socket.ioHandler(io);
}

// Expose app
export default app;
