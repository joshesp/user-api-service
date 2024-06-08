import { NextFunction, Request, Response } from 'express';
import AppError from '../core/errors/AppError';
import AuthService from '../services/AuthService';
import { verifyToken } from '../utils/jwt';

const authMiddleware = async (
    req: Request, _: Response, next: NextFunction
): Promise<void> => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new AppError('No token provided', 401);
    }

    const token = authHeader.split(' ')[1];

    try {
        const userId = verifyToken(token);
        const user = await AuthService.autheticateById(userId);

        req.user = user;

        next();
    } catch (error) {
        throw new AppError('Invalid token', 401);
    }
};

export default authMiddleware;