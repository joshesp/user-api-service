import { IUser } from "../payloads/IUserData";

export interface IUserService {
    create(user: IUser): Promise<number>
}