import Router from 'koa-router';
import jwt from '../middlewares/jwt';
import User from '../models/user';

const router = new Router({ prefix: '/api' });

router.use(jwt.jwtErrorHandler()).use(jwt.jwtInstance());

router.get('/user', async ctx => {
    const users = await User.find();
    ctx.body = users;
});

export default router;
