import { NextFunction, Request, Response } from 'express';
import AppError from '../core/errors/AppError';

const errorMiddleware = (error: AppError, req: Request, res: Response, _: NextFunction): void => {
    res.status(error.statusCode || 500).json({
        status: 'error',
        message: error.message,
        ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
    });
};

export default errorMiddleware;