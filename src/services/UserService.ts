
import AppError from "../core/errors/AppError";
import { IUserData } from "../core/interfaces/payloads/IUserData";
import { IUserService } from "../core/interfaces/user/IUserService";
import UserRepository from "../repositories/UserRepository";

class UserService implements IUserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    public async create(user: IUserData): Promise<number> {
        try {
            const userExist = await this.userRepository.findByEmail(user.email);

            if (userExist) {
                throw new AppError('User with this email already exists', 400);
            }

            const newUser = await this.userRepository.createUser(user);

            return newUser.id;
        } catch (error) {
            throw error;
        }
    };
}

export default new UserService();
