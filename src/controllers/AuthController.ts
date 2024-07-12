import { NextFunction, Request, Response } from "express";
import { IAuthController } from "../core/interfaces/auth/IAuthController";
import AuthService from "../services/AuthService";
import UserService from "../services/UserService";
import Logger from "../utils/Logger";

class AuthController implements IAuthController {
    async login(
        req: Request,
        res: Response<any, Record<string, any>>,
        next: NextFunction
    ): Promise<void> {
        try {
            const token = await AuthService.authenticate(req.body);
            Logger.info(`User is authenticated: ${req.body.email}`);
            res.status(200).json(token);
        } catch (error) {
            Logger.error(`Error created user: ${error}`);
            next(error);
        }
    }

    async register(
        req: Request,
        res: Response<any, Record<string, any>>,
        next: NextFunction
    ): Promise<void> {
        try {
            const userId = await UserService.create(req.body);
            Logger.info(`User created successfully: ${userId}`);
            res.status(201).json(null);
        } catch (error) {
            Logger.error(`Error created user: ${error}`);
            next(error);
        }
    }

    async refeshToken(
        req: Request,
        res: Response<any, Record<string, any>>,
        next: NextFunction
    ): Promise<void> {
        try {
            const token = await AuthService.refreshAccessToken(req.body);
            res.status(200).json(token);
        } catch (error) {
            next(error);
        }
    }

    async requestPasswordReset(
        req: Request,
        res: Response<any, Record<string, any>>,
        next: NextFunction
    ): Promise<void> {
        try {
            await AuthService.requestPasswordResetUser(req.body);
            res.status(200).json({ message: 'Password reset successfully' });
        } catch (error) {
            next(error);
        }
    }

    async updatePassword(
        req: Request,
        res: Response<any, Record<string, any>>,
        next: NextFunction
    ): Promise<void> {
        try {
            await AuthService.resetPassword(req.body);
            res.status(200).json({ message: 'Password reset successfully' });
        } catch (error) {
            next(error);
        }
    }
}

export default new AuthController();
