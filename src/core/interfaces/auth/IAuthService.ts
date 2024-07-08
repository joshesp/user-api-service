import { User } from "../../../entity/User";
import { IRefreshToken, IUpdatePassword, IUserAuthData } from "../payloads/IUserAuthData";


export interface IAuthSerice {
    autheticateById(userId: number): Promise<User>;
    authenticate({ email, password }: IUserAuthData): Promise<{ token: string, refreshToken: string }>;
    refreshAccessToken(refreshToken: IRefreshToken): Promise<{ token: string, refreshToken: string }>;
    requestPasswordResetUser(email: { email: string }): Promise<void>;
    resetPassword(updatePassword: IUpdatePassword): Promise<void>;
}