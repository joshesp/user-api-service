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

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: Correo del usuario
 *         password:
 *           type: string
 *           description: Contraseña del usuario
 *       example:
 *         email: johndoe@mail.com
 *         password: johnDoe20!@
 *     LoginResponse:
 *       type: object
 *       required:
 *         - token
 *         - refreshToken
 *       properties:
 *         token:
 *           type: string
 *           description: JWT de acceso
 *         refreshToken:
 *           type: string
 *           description: JWT para la actualizar el token de la sesión
 *       example:
 *         token: unwxnwY81e...
 *         refreshToken: hdn213kmsx/xe1...
 *     RegisterRequest:
 *       required:
 *          - name
 *          - lastname
 *          - email
 *          - password
 *       properties:
 *          name:
 *             type: string
 *             description: Nombre del usuario
 *          lastname:
 *             type: string
 *             description: Primer apellido del usuario
 *          email:
 *             type: string
 *             description: correo del usuario
 *          password:
 *             type: string
 *             description: contraseña del usuario
 *       example:
 *          name: John
 *          lastname: Doe
 *          email: johndoe@mail.com
 *          password: johnDoe20!@
 *     RefreshTokenRequest:
 *       type: object
 *       required:
 *         - token
 *       properties:
 *         token:
 *           type: string
 *           description: Refresh token generado en la autenticación
 *       example:
 *         token: ewceThbu23...
 *     ResetPasswordRequest:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           description: Correo del usuario
 *       example:
 *         email: johndoe@mail.com
 *     UpdatePasswordRequest:
 *       type: object
 *       required:
 *         - password
 *         - passwordConfirmation
 *         - token
 *       properties:
 *         password:
 *           type: string
 *           description: Nueva contraseña
 *         passwordConfirmation:
 *           type: string
 *           description: Confirmación del valor para la nueva contraseña
 *         token:
 *           type: string
 *           description: Token para la validación de actualización de la contraseña
 *       example:
 *         password: tl8&2wUj
 *         passwordConfirmation: tl8&2wUj
 *         token: fye8f823dj...
 */

/**
 * @openapi
 * tags:
 *    name: Autenticación
 *    description: Endpoints relacionados con la validación, creación de una cuenta de usuario, la recuperación y actualización de contraseña y actualización del JW token de la sesión del usuario.
 * '/auth/login':
 *  post:
 *     summary: Validación de credenciales para el acceso de un usuario.
 *     tags: [Autenticación]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *      200:
 *        description: Usuario valido
 *        content:
 *          application/json:
 *             schema:
 *                $ref: '#/components/schemas/LoginResponse'
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.post(
    '/login',
    [...userAccessFieldsRequired, authValidatorFieldsMiddleware],
    AuthController.login
);

/**
 * @openapi
 * '/auth/register':
 *  post:
 *     tags: [Autenticación]
 *     summary: Creación de una cuenta para un usuario.
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *      201:
 *        description: Cuenta creada
 *      400:
 *        description: Hay campos con errores
 *      500:
 *        description: Server Error
 */
router.post(
    '/register',
    [...userNewFieldsRequired, authValidatorFieldsMiddleware],
    AuthController.register
);

/**
 * @openapi
 * '/auth/refresh-token':
 *  post:
 *     summary: Actualización del JW Token.
 *     tags: [Autenticación]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            $ref: '#/components/schemas/RefreshTokenRequest'
 *     responses:
 *      200:
 *        description: Token actualizado
 *        content:
 *          application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *      401:
 *        description: Token invalido
 *      500:
 *        description: Server Error
 */
router.post(
    '/refresh-token',
    [...userRefreshTokenFieldsRequired, authValidatorFieldsMiddleware],
    AuthController.refeshToken
);

/**
 * @openapi
 * '/auth/reset-password':
 *  post:
 *     summary: Solicitud de renovación de contraseña.
 *     tags: [Autenticación]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            $ref: '#/components/schemas/ResetPasswordRequest'
 *     responses:
 *      200:
 *        description: Solicitud existosa
 *      404:
 *        description: Correo inexistente
 *      500:
 *        description: Server Error
 */
router.post(
    '/reset-password',
    [...userRquestPasswordResetFieldsRequired, authValidatorFieldsMiddleware],
    AuthController.requestPasswordReset
);

/**
 * @openapi
 * '/auth/update-password':
 *  post:
 *     summary: Actualización de contraseña.
 *     tags: [Autenticación]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            $ref: '#/components/schemas/ResetPasswordRequest'
 *     responses:
 *      200:
 *        description: Contraseña actualizada
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.post(
    '/update-password',
    [...userPasswordResetFieldsRequired, authValidatorFieldsMiddleware],
    AuthController.updatePassword
);

export default router;
