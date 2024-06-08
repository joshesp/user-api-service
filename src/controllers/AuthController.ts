import { NextFunction, Request, Response } from "express";
import { IAuthController } from "../core/interfaces/IAuthController";
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
            res.status(201).json({ message: 'User created successfully' });
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
            const { refreshToken } = req.body;
            const token = await AuthService.refreshAccessToken(refreshToken);
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
            const { email } = req.body;
            await AuthService.requestPasswordResetUser(email);
            res.status(200).json({ message: 'Password reset successfully' });
        } catch (error) {
            next(error);
        }
    }

    async resetPassword(
        req: Request,
        res: Response<any, Record<string, any>>,
        next: NextFunction
    ): Promise<void> {
        throw new Error("Method not implemented.");
    }
}

export default new AuthController();
