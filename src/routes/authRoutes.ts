import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import {
    authValidatorFieldsMiddleware,
    userAccessFieldsRequired,
    userNewFieldsRequired,
    userRefreshTokenFieldsRequired,
    userRquestPasswordResetFieldsRequired
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

router.post(
    '/request-password-reset',
    [...userRquestPasswordResetFieldsRequired, authValidatorFieldsMiddleware],
    AuthController.requestPasswordReset
);


export default router;
