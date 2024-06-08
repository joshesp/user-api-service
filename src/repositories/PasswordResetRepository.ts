import { Repository } from "typeorm";
import { AppDataSource } from "../config/connectionDatabase";
import { IPasswordResetRepository } from "../core/interfaces/auth/IPasswordResetRepository";
import { PasswordReset } from "../entity/PasswordReset";

class PasswordResetRepository implements IPasswordResetRepository {
    private repository: Repository<PasswordReset>;

    constructor() {
        this.repository = AppDataSource.getRepository(PasswordReset);
    }

    public create(userId: number, token: string): Promise<PasswordReset> {
        const data = new PasswordReset();

        data.token = token;
        data.userId = userId;

        return this.repository.save(data);
    }

    public findByUser(userId: number): Promise<PasswordReset | null> {
        return this.repository.findOne({ where: { userId } })
    }

    public findByToken(token: string): Promise<PasswordReset | null> {
        return this.repository.findOneBy({ token });
    }

    public deleteByUser(userId: number): Promise<unknown> {
        return this.repository.delete({ userId });
    }

}

export default PasswordResetRepository