import { NextFunction, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import AppError from '../core/errors/AppError';
import Logger from '../utils/Logger';

export const userNewFieldsRequired = [
    check('name').notEmpty().isLength({ max: 50 }).trim().escape(),
    check('lastname').notEmpty().isLength({ max: 50 }).trim().escape(),
    check('email').isEmail().isLength({ max: 50 }).normalizeEmail(),
    check('password').notEmpty().isLength({ min: 6 }).trim().escape(),
];

export const userAccessFieldsRequired = [
    check('email').isEmail().isLength({ max: 50 }).normalizeEmail(),
    check('password').notEmpty().isLength({ min: 6 }).trim().escape()
];

export const userRefreshTokenFieldsRequired = [
    check('refreshToken').notEmpty().trim().escape(),
];

export const userRquestPasswordResetFieldsRequired = [
    check('email').notEmpty().trim().escape(),
];

export const userPasswordResetFieldsRequired = [
    check('password').notEmpty().trim().escape(),
    check('passwordConfirmation').notEmpty().isLength({ min: 6 }).trim().escape().custom(
        (value, { req }) => (value === req.body.password)
    ),
    check('token').notEmpty().trim().escape(),
];

export const authValidatorFieldsMiddleware = (
    req: Request, _: Response, next: NextFunction
) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        Logger.error(`Error: ${JSON.stringify(errors.array())}`);
        throw new AppError('There are fields that are required.', 400);
    }

    next();
}
