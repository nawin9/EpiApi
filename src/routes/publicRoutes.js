import Router from 'koa-router';
import homeCtrl from '../controllers/home';
import authCtrl from '../controllers/auth';

const router = new Router();

router.get('/', homeCtrl.welcome);
router.post('/login', authCtrl.login);
router.post('/register', authCtrl.register);

export default router;
