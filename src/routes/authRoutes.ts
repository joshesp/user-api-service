import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import {
    authValidatorFieldsMiddleware,
    userAccessFieldsRequired,
    userNewFieldsRequired,
    userRefreshTokenFieldsRequired
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

router.post(
    '/refresh-token',
    [...userRefreshTokenFieldsRequired, authValidatorFieldsMiddleware],
    AuthController.refeshToken
);

export default router;
