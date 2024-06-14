import { User } from "../../../entity/User";
import { IUserData } from "../payloads/IUserData";

export interface IUserRopository {
    findById(id: number): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    createUser(user: IUserData): Promise<User>;
    updateUser(user: User): Promise<User>;
}