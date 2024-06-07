import { Repository } from "typeorm";
import { AppDataSource } from "../config/connectionDatabase";
import { IUserData } from "../core/interfaces/IUserData";
import { User } from "../entity/User";

class UserRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = AppDataSource.getRepository(User);
    }

    public findByEmail(email: string): Promise<User | null> {
        return this.repository.findOneBy({ email: email });
    }

    public createUser(user: IUserData): Promise<User> {
        const newUser = new User();

        newUser.name = user.name;
        newUser.lastname = user.lastname;
        newUser.email = user.email;
        newUser.password = user.password;

        return this.repository.save(newUser);
    }

    public setRequestPasswordReset(user: User, requestPasswordReset: boolean): Promise<User> {
        user.requestPasswordReset = requestPasswordReset;

        return this.repository.save(user);
    }
}

export default UserRepository;
