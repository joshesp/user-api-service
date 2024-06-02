import jwt from 'jsonwebtoken';
import { JWT_EXPIRATION, JWT_REFRESH_EXPIRES_IN, JWT_REFRESH_SECRET, JWT_SECRET } from '../config/env';
import { IUserSession } from '../core/interfaces/IUserData';
import { decrypt, encrypt } from './cryptoUtils';


const jwtValuesEnv = (isRefreshToken: boolean): { jwtSecret: string, jwtExpiresIn: string } => {
    return {
        jwtSecret: isRefreshToken ? JWT_REFRESH_SECRET : JWT_SECRET,
        jwtExpiresIn: isRefreshToken ? JWT_REFRESH_EXPIRES_IN : JWT_EXPIRATION
    };
}

export const generateToken = (payload: IUserSession, isRefreshToken = false): string => {
    const { jwtSecret, jwtExpiresIn } = jwtValuesEnv(isRefreshToken);

    const encryptedId = encrypt(`${payload.id}`);
    const tokenPayload = { id: encryptedId, email: payload.email };
    return jwt.sign(tokenPayload, jwtSecret, { expiresIn: jwtExpiresIn });
};

export const verifyToken = (token: string, isRefreshToken = false): IUserSession => {
    const { jwtSecret } = jwtValuesEnv(isRefreshToken);

    try {
        const decoded = jwt.verify(token, jwtSecret) as { id: string, email: string };
        const decryptedId = decrypt(decoded.id);

        return { ...decoded, id: +decryptedId };
    } catch (error) {
        throw new Error('Invalid token');
    }
};

