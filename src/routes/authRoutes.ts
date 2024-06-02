import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import {
    authValidatorFieldsMiddleware,
    userAccessFieldsRequired,
    userNewFieldsRequired
} from '../middlewares/authValidatorFieldsMiddleware';

const router = Router();

router.post(
    '/login',
    [...userAccessFieldsRequired, authValidatorFieldsMiddleware],
    AuthController.login
);

router.post(
    '/register',
    [...userNewFieldsRequired, authValidatorFieldsMiddleware],
    AuthController.register
);

export default router;
