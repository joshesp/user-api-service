import { PasswordReset } from "../../../entity/PasswordReset";

export interface IPasswordResetRepository {
    create(userId: number, token: string): Promise<PasswordReset>;
    findByUser(userId: number): Promise<PasswordReset | null>;
    findByToken(token: string): Promise<PasswordReset | null>;
    deleteByUser(userId: number): Promise<unknown>;
}