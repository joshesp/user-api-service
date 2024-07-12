import { Repository } from "typeorm";
import { AppDataSource } from "../config/connectionDatabase";
import { IUserCreate } from "../core/interfaces/payloads/IUserData";
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

    public findByEmailAndId({ email, id }: { email: string, id: number }): Promise<User | null> {
        return this.repository.createQueryBuilder()
            .where('user.id = :id', { id })
            .andWhere('user.email = :email', { email })
            .andWhere('user.account_blocked = :isBlocked', { isBlocked: false })
            .getOne();
    }

    public findByEmail(email: string): Promise<User | null> {
        return this.repository.findOneBy({ email: email });
    }

    public createUser(user: IUserCreate): Promise<User> {
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
