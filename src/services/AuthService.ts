
import AppError from "../core/errors/AppError";
import { IUserAuthData } from "../core/interfaces/IUserData";
import UserRepository from "../repositories/UserRepository";
import { generateToken, verifyToken } from "../utils/jwt";

class AuthService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    public async authenticate(
        { email, password }: IUserAuthData
    ): Promise<{ token: string, refreshToken: string }> {
        try {
            const user = await this.userRepository.findByEmail(email);

            if (!user) {
                throw new AppError('User not found.', 401);
            }

            const isValidPassword = await user.validatePassword(password);

            if (!isValidPassword) {
                throw new AppError('Invalid password.', 401);
            }

            const payloadJwt = { id: user.id, email: user.email };
            const token = generateToken(payloadJwt);
            const refreshToken = generateToken(payloadJwt, true);

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
}

export default new AuthService();
