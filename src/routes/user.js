import { Router } from 'express';
import user from '../controllers/UserController';
// import loginRequired from '../middleware/loginRequired';

const router = new Router();

router.post('/', user.store);
// router.put('/', loginRequired, user.store;

export default router;
