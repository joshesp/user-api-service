import { NextFunction, Request, Response } from 'express';
import AppError from '../core/errors/AppError';
import Logger from '../utils/Logger';

const errorMiddleware = (error: Error, _: Request, res: Response, __: NextFunction): void => {
    Logger.error(`Error: ${error.message}`);

    if (error instanceof AppError) {
        res.status(error.statusCode).json({
            status: 'error',
            message: error.message,
            ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
        });
    } else {
        console.error(error);

        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
        });
    }

};

export default errorMiddleware;