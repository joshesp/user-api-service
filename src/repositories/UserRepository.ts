import { Repository } from "typeorm";
import { AppDataSource } from "../config/connectionDatabase";
import { IUserData } from "../core/interfaces/payloads/IUserData";
import { IUserRopository } from "../core/interfaces/user/IUserRopository";
import { User } from "../entity/User";

class UserRepository implements IUserRopository {
    private repository: Repository<User>;

    constructor() {
        this.repository = AppDataSource.getRepository(User);
    }

    public findById(id: number): Promise<User | null> {
        return this.repository.findOneBy({ id });
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

    public updateUser(user: User): Promise<User> {
        return this.repository.save(user);
    }
}

export default UserRepository;
