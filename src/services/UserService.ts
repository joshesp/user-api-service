
import AppError from "../core/errors/AppError";
import { User } from "../entity/User";
import UserRepository from "../repositories/UserRepository";

class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    public async create(user: { [key: string]: string }): Promise<User> {
        try {
            const userExist = await this.userRepository.findByEmail(user.email);

            if (userExist) {
                throw new AppError('User with this email already exists', 400);
            }

            return await this.userRepository.createUser(user);
        } catch (error) {
            throw error;
        }
    };
}

export default new UserService();