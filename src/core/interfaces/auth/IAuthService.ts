import { User } from "../../../entity/User";
import { IAuthToken, IRefreshToken, IUpdatePassword, IUserAuth } from "../payloads/IUserAuthData";


export interface IAuthSerice {
    autheticateById(userId: number): Promise<User>;
    authenticate({ email, password }: IUserAuth): Promise<IAuthToken>;
    refreshAccessToken(refreshToken: IRefreshToken): Promise<{ token: string, refreshToken: string }>;
    requestPasswordResetUser(email: { email: string }): Promise<void>;
    resetPassword(updatePassword: IUpdatePassword): Promise<void>;
}