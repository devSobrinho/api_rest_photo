import { Router } from 'express';
import profile from '../controllers/Profile';
import loginRequired from '../middleware/loginRequired';

const router = new Router();

router.get('/', loginRequired, profile.index);
router.post('/', loginRequired, profile.store);
router.put('/', loginRequired, profile.update);

export default router;
