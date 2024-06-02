import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import { userDataPostMiddleware, userFieldsRequired } from '../middlewares/userDataPostMiddleware';

const router = Router();

router.post(
    '/register',
    [...userFieldsRequired, userDataPostMiddleware],
    AuthController.register
);

export default router;
