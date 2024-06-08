import { NextFunction, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import AppError from '../core/errors/AppError';
import UserRepository from '../repositories/UserRepository';
import Logger from '../utils/Logger';

/**
 * Validación base de los campos
 */
const fieldName = check('name')
    .notEmpty()
    .withMessage('El campo de nombre es requerido.')
    .isLength({ max: 50 })
    .withMessage('El campo de nombre no debe exceder los 50 caracteres.')
    .trim()
    .escape()
    .withMessage('El campo de nombre no cumple con los requisitos.');
const fieldLastname = check('lastname')
    .notEmpty()
    .withMessage('El campo del apellido es requerido.')
    .isLength({ max: 50 })
    .withMessage('El campo del apellido no debe exceder los 50 caracteres.')
    .trim()
    .escape()
    .withMessage('El campo del apellido no cumple con los requisitos.');
const fieldEmail = check('email')
    .isEmail()
    .withMessage('El correo electrónico no es valido.')
    .isLength({ max: 50 }).normalizeEmail({
        gmail_remove_dots: false
    });
const fieldPassword = check('password')
    .notEmpty()
    .withMessage('La contraseña es requerida.')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe ser de al menos 6 caracteres.')
    .trim()
    .escape()
    .withMessage('La contraseña no cumple con los requisitos.');
const fieldPasswordConfirm = check('passwordConfirmation')
    .notEmpty()
    .withMessage('La confirmación de la contraseña es requerida.')
    .trim()
    .escape()
    .custom((value, { req }) => (value === req.body.password))
    .withMessage('La contraseñas no coinciden');
const fieldToken = check('token')
    .notEmpty()
    .withMessage('EL token es requerido.')
    .trim()
    .escape()
    .withMessage('El valor del token es requerido.');


/**
 * Exportación de las validaciones en base al escenario ejecutado
 */
export const userNewFieldsRequired = [
    fieldName,
    fieldLastname,
    fieldEmail.custom(async (value) => {
        const userExist = await new UserRepository().findByEmail(value);
        if (userExist) {
            throw new AppError('El correo electrónico ya existe', 400);
        }
    }),
    fieldPassword,
];
export const userAccessFieldsRequired = [fieldEmail, fieldPassword];
export const userRefreshTokenFieldsRequired = [fieldToken];
export const userRquestPasswordResetFieldsRequired = [fieldEmail];
export const userPasswordResetFieldsRequired = [
    fieldPassword,
    fieldPasswordConfirm,
    fieldToken
];

/**
 * Utilida de 'express-validator' para ejecutar las validaciones
 * configuradas
 */

export const authValidatorFieldsMiddleware = (
    req: Request, _: Response, next: NextFunction
) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        Logger.error(`Error: ${JSON.stringify(errors.array())}`);

        throw new AppError(
            `Hay campos con errores: ${errors.array().map(e => e.msg).join(', ')}`,
            400
        );
    }

    next();
}
