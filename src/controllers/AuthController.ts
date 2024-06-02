import { NextFunction, Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { IAuthController } from "../core/interfaces/IAuthController";
import AuthService from "../services/AuthService";
import UserService from "../services/UserService";
import Logger from "../utils/Logger";

class AuthController implements IAuthController {
    async login(
        req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
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
        req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
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
        req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
        res: Response<any, Record<string, any>>,
        next: NextFunction
    ): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async requestPasswordReset(
        req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
        res: Response<any, Record<string, any>>,
        next: NextFunction
    ): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async resetPassword(
        req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
        res: Response<any, Record<string, any>>,
        next: NextFunction
    ): Promise<void> {
        throw new Error("Method not implemented.");
    }
}

export default new AuthController();
