import { Router } from 'express';
import photo from '../controllers/Photo';
import loginRequired from '../middleware/loginRequired';

const router = new Router();

router.get('/all', loginRequired, photo.index);
router.get('/', loginRequired, photo.show);
router.post('/', loginRequired, photo.store);
router.delete('/:id', loginRequired, photo.delete);

export default router;
