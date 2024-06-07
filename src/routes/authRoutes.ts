import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import authMiddleware from '../middlewares/authMiddleware';
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

router.get(
    '/request-password-reset',
    [authMiddleware],
    AuthController.requestPasswordReset
);

export default router;
