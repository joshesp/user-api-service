import { NextFunction, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import AppError from '../core/errors/AppError';

export const userFieldsRequired = [
    check('name').notEmpty().isLength({ max: 50 }).trim().escape(),
    check('lastname').notEmpty().isLength({ max: 50 }).trim().escape(),
    check('email').isEmail().isLength({ max: 50 }).normalizeEmail(),
    check('password').notEmpty().isLength({ min: 6 }).trim().escape(),
];


export const userDataPostMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        throw new AppError('There are fields that are required.', 400);
    }

    next();
}