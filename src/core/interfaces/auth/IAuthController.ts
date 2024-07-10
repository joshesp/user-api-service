import { NextFunction, Request, Response } from 'express';

export interface IAuthController {
    login(req: Request, res: Response, next: NextFunction): Promise<void>;
    register(req: Request, res: Response, next: NextFunction): Promise<void>;
    refeshToken(req: Request, res: Response, next: NextFunction): Promise<void>;
    requestPasswordReset(
        req: Request, res: Response, next: NextFunction
    ): Promise<void>;
    updatePassword(
        req: Request, res: Response, next: NextFunction
    ): Promise<void>;
}
