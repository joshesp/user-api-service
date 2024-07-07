import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import {
    authValidatorFieldsMiddleware,
    userAccessFieldsRequired,
    userNewFieldsRequired,
    userPasswordResetFieldsRequired,
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
    '/reset-password',
    [...userRquestPasswordResetFieldsRequired, authValidatorFieldsMiddleware],
    AuthController.requestPasswordReset
);

router.post(
    '/update-password',
    [...userPasswordResetFieldsRequired, authValidatorFieldsMiddleware],
    AuthController.updatePassword
);

export default router;
