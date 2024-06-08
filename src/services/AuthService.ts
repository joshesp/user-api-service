
import { ID_MESSAGES_ERROR } from "../config/constanst";
import AppError from "../core/errors/AppError";
import { IAuthSerice } from "../core/interfaces/auth/IAuthService";
import { IUserAuthData } from "../core/interfaces/payloads/IUserData";
import { User } from "../entity/User";
import PasswordResetRepository from "../repositories/PasswordResetRepository";
import UserRepository from "../repositories/UserRepository";
import { generateRandomToken } from "../utils/cryptoUtils";
import { generateToken, verifyToken } from "../utils/jwt";

class AuthService implements IAuthSerice {
    private userRepository: UserRepository;
    private passwordResetProv: PasswordResetRepository;

    constructor() {
        this.userRepository = new UserRepository();
        this.passwordResetProv = new PasswordResetRepository();
    }

    public async autheticateById(userId: number): Promise<User> {
        try {
            const user = await this.userRepository.findById(userId);

            this.verifyUserStatus(user);

            return user!;
        } catch (error) {
            throw error;
        }
    }

    public async authenticate(
        { email, password }: IUserAuthData
    ): Promise<{ token: string, refreshToken: string }> {
        try {
            const user = await this.userRepository.findByEmail(email);

            this.verifyUserStatus(user);

            const requestPasswordReset = await this.passwordResetProv.findByUser(
                user!.id
            );

            if (requestPasswordReset) {
                throw new AppError(ID_MESSAGES_ERROR.RESET_PASSWORD_REQ, 401);
            }

            const isValidPassword = await user!.validatePassword(password);

            if (!isValidPassword) {
                throw new AppError(ID_MESSAGES_ERROR.INVALID_PASSWORD, 401);
            }

            const token = generateToken(user!.id);
            const refreshToken = generateToken(user!.id, true);

            return { token, refreshToken };
        } catch (error) {
            throw error;
        }
    };

    public async refreshAccessToken(
        token: string
    ): Promise<{ token: string, refreshToken: string }> {
        try {
            const decoded = verifyToken(token, true);
            const newToken = generateToken(decoded);
            const refreshToken = generateToken(decoded, true);

            return { token: newToken, refreshToken };
        } catch (error) {
            throw new AppError(ID_MESSAGES_ERROR.TOKEN_NOT_FOUND, 401);
        }
    }

    public async requestPasswordResetUser(email: string): Promise<void> {
        try {
            const user = await this.userRepository.findByEmail(email);

            this.verifyUserStatus(user);

            const requestPasswordReset = await this.passwordResetProv.findByUser(
                user!.id
            );

            if (requestPasswordReset) {
                await this.passwordResetProv.deleteByUser(user!.id);
            }

            const token = generateRandomToken();

            await this.passwordResetProv.create(user!.id, token);

            // TODO: Send link or code (email/sms) to user
        } catch (error) {
            throw error;
        }
    }

    public async resetPassword(token: string, password: string): Promise<void> {
        try {
            const tokenData = await this.passwordResetProv.findByToken(token);

            if (!tokenData) {
                throw new AppError(ID_MESSAGES_ERROR.TOKEN_NOT_FOUND, 401);
            }

            const timeDifferenceInMinutes = Math.round(
                (Date.now() - tokenData.createdAt.getTime()) / (1000 * 60)
            );

            if (timeDifferenceInMinutes > 20) {
                throw new AppError(ID_MESSAGES_ERROR.TOKEN_EXPIRED, 401);
            }

            const user = await this.userRepository.findById(tokenData.userId);

            if (!user) {
                throw new AppError(ID_MESSAGES_ERROR.USER_NOT_FOUND, 401);
            }

            user.password = password;

            await this.userRepository.updateUser(user);
            await this.passwordResetProv.deleteByUser(user.id);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Se valida si el usario existe y no esta bloqueado
     */
    private verifyUserStatus(user: User | null): void {
        if (!user) {
            throw new AppError(ID_MESSAGES_ERROR.USER_NOT_FOUND, 401);
        }

        if (user.isAccountBlocked) {
            throw new AppError(ID_MESSAGES_ERROR.USER_BLOCKED, 401);
        }
    }
}

export default new AuthService();
