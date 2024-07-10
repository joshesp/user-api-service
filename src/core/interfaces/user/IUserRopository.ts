import { User } from "../../../entity/User";
import { IUserCreate } from "../payloads/IUserData";

export interface IUserRopository {
    findById(id: number): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    createUser(user: IUserCreate): Promise<User>;
    updateUser(user: User): Promise<User>;
}