import { NextFunction, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import AppError from '../core/errors/AppError';
import Logger from '../utils/Logger';

export const userFieldsRequired = [
    check('name').notEmpty().isLength({ max: 50 }).trim().escape(),
    check('lastname').notEmpty().isLength({ max: 50 }).trim().escape(),
    check('email').isEmail().isLength({ max: 50 }).normalizeEmail(),
    check('password').notEmpty().isLength({ min: 6 }).trim().escape(),
];


export const userDataCreateMiddleware = (
    req: Request, _: Response, next: NextFunction
) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        Logger.error(`Error: ${JSON.stringify(errors.array())}`);
        throw new AppError('There are fields that are required.', 400);
    }

    next();
}
