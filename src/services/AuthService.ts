
import AppError from "../core/errors/AppError";
import { IUserAuthData } from "../core/interfaces/IUserData";
import UserRepository from "../repositories/UserRepository";
import { generateToken } from "../utils/jwt";

class AuthService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    public async authenticate(
        { email, password }: IUserAuthData
    ): Promise<{ token: string }> {
        try {
            const user = await this.userRepository.findByEmail(email);

            if (!user) {
                throw new AppError('User not found.', 401);
            }

            const isValidPassword = await user.validatePassword(password);

            if (!isValidPassword) {
                throw new AppError('Invalid password.', 401);
            }

            const token = generateToken({ id: user.id, email: user.email });

            return { token };
        } catch (error) {
            throw error;
        }
    };
}

export default new AuthService();
