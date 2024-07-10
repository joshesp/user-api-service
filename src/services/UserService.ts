
import { IUserCreate } from "../core/interfaces/payloads/IUserData";
import { IUserService } from "../core/interfaces/user/IUserService";
import UserRepository from "../repositories/UserRepository";

class UserService implements IUserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    public async create(user: IUserCreate): Promise<number> {
        try {
            const newUser = await this.userRepository.createUser(user);

            return newUser.id;
        } catch (error) {
            throw error;
        }
    };
}

export default new UserService();
