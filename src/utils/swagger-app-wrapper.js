import swaggerUi from 'swagger-ui-koa';
import convert from 'koa-convert';
import mount from 'koa-mount';
import swaggerSpec from '../spec';

export default function(app) {
  app.use(swaggerUi.serve);
  app.use(convert(mount('/swagger', swaggerUi.setup(swaggerSpec))));
}
