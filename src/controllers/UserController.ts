import { NextFunction, Request, Response } from 'express';
import { Route } from 'tsoa';
import { IUserController } from '../core/interfaces/user/IUserController';

@Route("users")
class UserController implements IUserController {
    async info(_: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            res.status(201).json({
                status: 'success',
                data: {},
            });
        } catch (error) {
            next(error);
        }
    }
}

export default new UserController();
