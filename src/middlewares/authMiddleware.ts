import { NextFunction, Request, Response } from 'express';
import AppError from '../core/errors/AppError';
import { verifyToken } from '../utils/jwt';

const authMiddleware = (req: Request, _: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new AppError('No token provided', 401);
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        throw new AppError('Invalid token', 401);
    }
};

export default authMiddleware;