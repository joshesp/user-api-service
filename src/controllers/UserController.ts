import { NextFunction, Request, Response } from 'express';
import { IUserController } from '../core/interfaces/user/IUserController';

class UserController implements IUserController {
    async info(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { name, lastname, email, lastLogin } = req.user;
            res.status(201).json({ name, lastname, email, lastLogin });
        } catch (error) {
            next(error);
        }
    }
}

export default new UserController();
