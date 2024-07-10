import { IUserData } from "../payloads/IUserData";

export interface IUserService {
    create(user: IUserData): Promise<number>
}