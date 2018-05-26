import jwt from 'koa-jwt';
import jsonwebtoken from 'jsonwebtoken';

const secret = 'jwt-secret';
const instance = jwt({ secret });

const jwtInstance = () => instance;

const errorHandler = (ctx, next) =>
    next().catch(err => {
        if (err.status === 401) {
            ctx.status = 401;
            ctx.body = {
                error: 'Not authorized',
            };
        } else {
            throw err;
        }
    });

const jwtErrorHandler = () => errorHandler;

const issue = payload => jsonwebtoken.sign(payload, secret);

export default { jwtInstance, jwtErrorHandler, issue };
