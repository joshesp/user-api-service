
import AppError from "../core/errors/AppError";
import { IUserAuthData } from "../core/interfaces/IUserData";
import { User } from "../entity/User";
import PasswordResetRepository from "../repositories/PasswordResetRepository";
import UserRepository from "../repositories/UserRepository";
import { generateRandomToken } from "../utils/cryptoUtils";
import { generateToken, verifyToken } from "../utils/jwt";

class AuthService {
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

            const requestPasswordReset = await this.passwordResetProv.findByUser(user!.id);

            if (requestPasswordReset) {
                throw new AppError('User request password reset.', 401);
            }

            const isValidPassword = await user!.validatePassword(password);

            if (!isValidPassword) {
                throw new AppError('Invalid password.', 401);
            }

            const token = generateToken(user!.id);
            const refreshToken = generateToken(user!.id, true);

            return { token, refreshToken };
        } catch (error) {
            throw error;
        }
    };

    public async refreshAccessToken(token: string): Promise<{ token: string, refreshToken: string }> {
        try {
            const decoded = verifyToken(token, true);
            const newToken = generateToken(decoded);
            const refreshToken = generateToken(decoded, true);

            return { token: newToken, refreshToken };
        } catch (error) {
            throw new AppError('Invalid refresh token', 401);
        }
    }

    public async requestPasswordResetUser(email: string): Promise<void> {
        try {
            const user = await this.userRepository.findByEmail(email);

            this.verifyUserStatus(user);

            const requestPasswordReset = await this.passwordResetProv.findByUser(user!.id);

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

    private verifyUserStatus(user: User | null): void {
        if (!user) {
            throw new AppError('User not found.', 401);
        }

        if (user.isAccountBlocked) {
            throw new AppError('User is not active.', 401);
        }
    }
}

export default new AuthService();
