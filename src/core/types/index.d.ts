import { IUserSession } from '../interfaces/IUserData';

declare global {
    namespace Express {
        export interface Request {
            user: IUserSession
        }
    }
}