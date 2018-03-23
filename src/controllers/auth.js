import jwt from '../middlewares/jwt';
import User from '../models/user';

/**
 * @swagger
 * /login:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Login a user
 *     operationId: login
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: User object
 *         in:  body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/NewUser'
 *     responses:
 *       200:
 *         description: Authentication using jwt
 *         schema:
 *           $ref: '#/definitions/User'
 */
const login = async ctx => {
  const { username, password } = ctx.request.body;

  const user = await User.findOne({ username });
  if (user && user.validPassword(password)) {
    ctx.body = {
      id: user._id,
      token: jwt.issue({ user: '' }),
    };
  } else {
    ctx.status = 401;
    ctx.body = { error: 'Invalid login' };
  }
};

/**
 * @swagger
 * /register:
 *   post:
 *     tags:
 *      - Authentication
 *     summary: Register a new user
 *     description: Creates a user
 *     operationId: register
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: User object
 *         in:  body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/NewUser'
 *     responses:
 *       200:
 *         description: Ok
 */
const register = async ctx => {
  const { username, password } = ctx.request.body;
  const user = new User();
  user.username = username;
  user.password = user.generateHash(password);
  await user.save();
  ctx.body = { message: 'OK' };
};

export default { login, register };

/**
 * @swagger
 * definitions:
 *   NewUser:
 *     type: object
 *     required:
 *       - username
 *       - password
 *     properties:
 *       username:
 *         type: string
 *       password:
 *         type: string
 *         format: password
 *   User:
 *      type: object
 *      properties:
 *         id:
 *           type: string
 *         token:
 *           type: string
 */
