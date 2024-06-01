import { Router } from 'express';
import UserController from '../controllers/UserController';
import { userDataPostMiddleware, userFieldsRequired } from '../middlewares/userDataPostMiddleware';

const router = Router();

router.post('/users', [...userFieldsRequired, userDataPostMiddleware], UserController.create);
router.get('/users/:id', UserController.info);
router.put('/users/:id', UserController.update);
router.delete('/users/:id', UserController.delete);

export default router;