import { User } from "../../../entity/User";
import { IUserAuthData } from "../payloads/IUserData";

export interface IAuthSerice {
    autheticateById(userId: number): Promise<User>;
    authenticate({ email, password }: IUserAuthData): Promise<{ token: string, refreshToken: string }>;
    refreshAccessToken(token: string): Promise<{ token: string, refreshToken: string }>;
    requestPasswordResetUser(email: string): Promise<void>;
    resetPassword(token: string, password: string): Promise<void>
}