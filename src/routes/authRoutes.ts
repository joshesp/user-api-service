import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import { userDataCreateMiddleware, userFieldsRequired } from '../middlewares/userDataPostMiddleware';

const router = Router();

router.post(
    '/register',
    [...userFieldsRequired, userDataCreateMiddleware],
    AuthController.register
);
router.post(
    '/register',
    [...userFieldsRequired, userDataCreateMiddleware],
    AuthController.register
);

export default router;
