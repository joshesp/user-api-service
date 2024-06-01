import { NextFunction, Request, Response } from 'express';
import { IUserController } from '../core/interfaces/IUserController';
import UserService from '../services/UserService';
import Logger from '../utils/Logger';

class UserController implements IUserController {
    async info(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            res.status(201).json({
                status: 'success',
                data: req.body,
            });
        } catch (error) {
            next(error);
        }
    }
    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const user = await UserService.create(req.body);
            Logger.info(`User created successfully: ${user.id}`);
            res.status(201).json(user);
        } catch (error) {
            Logger.error(`Error created user: ${error}`);
            next(error);
        }
    }
    update(req: Request, res: Response, next: NextFunction): Promise<void> {
        throw new Error('Method not implemented.');
    }
    delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        throw new Error('Method not implemented.');
    }
}

export default new UserController();