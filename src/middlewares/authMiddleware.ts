import { NextFunction, Request, Response } from 'express';
import AuthService from '../services/AuthService';
import { verifyToken } from '../utils/jwt';
import Logger from '../utils/Logger';

const authMiddleware = async (
    req: Request, res: Response, next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json('No token provided.');
    }

    const token = authHeader.split(' ')[1];

    try {
        const credentials = verifyToken(token);
        const user = await AuthService.autheticateByIdAndEmail(credentials);

        req.user = user;

        next();
    } catch (error) {
        Logger.error(error)
        return res.status(401).json('Invalid token.')
    }
};

export default authMiddleware;