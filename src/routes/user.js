import { Router } from 'express';
import user from '../controllers/UserController';
import loginRequired from '../middleware/loginRequired';

const router = new Router();

router.get('/:id', user.show);
router.post('/', user.store);
router.put('/', loginRequired, user.update);
router.delete('/', loginRequired, user.delete);

export default router;
