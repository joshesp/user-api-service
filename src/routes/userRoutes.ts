import { Router } from 'express';
import UserController from '../controllers/UserController';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *      BearerAuth:
 *         type: http
 *         scheme: bearer
 *         in: header
 *   schemas:
 *     UsuarioResponse:
 *       type: object
 *       required:
 *         - name
 *         - lastname
 *         - email
 *         - lastLogin
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre del usuario
 *         lastname:
 *           type: string
 *           description: Primer apellido del usuario
 *         email:
 *           type: string
 *           description: Correo del usuario
 *         lastLogin:
 *           type: string
 *           description: Fecha de último acceso a la aplicación
 *       example:
 *         name: John
 *         lastname: Doe
 *         email: johndoe@mail.com
 *         lastLogin: 2024-06-13T04:44:56.293Z
 * security:
 *    - bearerAuth: [] 
*/

/**
 * @openapi
 * tags:
 *    name: Usuario
 *    description: Endpoints para las acciones relacionada a la gestión de la cuenta del usuario en sesión
 * '/api/users':
 *  get:
 *     summary: Validación de credenciales para el acceso de un usuario.
 *     tags: [Usuario]
 *     security:
 *        - bearerAuth: []
 *     responses:
 *      200:
 *        description: Datos del usuario
 *        content:
 *          application/json:
 *             schema:
 *                $ref: '#/components/schemas/UsuarioResponse'
 *      401:
 *        description: Token invalido
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.get('/', [authMiddleware], UserController.info);

export default router;
