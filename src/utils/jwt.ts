import jwt from 'jsonwebtoken';
import {
    JWT_EXPIRATION,
    JWT_REFRESH_EXPIRES_IN,
    JWT_REFRESH_SECRET,
    JWT_SECRET
} from '../config/env';
import { decrypt, encrypt } from './cryptoUtils';


const jwtValuesEnv = (isRefreshToken: boolean): { jwtSecret: string, jwtExpiresIn: string } => {
    return {
        jwtSecret: isRefreshToken ? JWT_REFRESH_SECRET : JWT_SECRET,
        jwtExpiresIn: isRefreshToken ? JWT_REFRESH_EXPIRES_IN : JWT_EXPIRATION
    };
}

export const generateToken = (userId: number, isRefreshToken = false): string => {
    const { jwtSecret, jwtExpiresIn } = jwtValuesEnv(isRefreshToken);

    const encryptedId = encrypt(`${userId}`);
    const tokenPayload = { uuid: encryptedId };
    return jwt.sign(tokenPayload, jwtSecret, { expiresIn: jwtExpiresIn });
};

export const verifyToken = (token: string, isRefreshToken = false): number => {
    const { jwtSecret } = jwtValuesEnv(isRefreshToken);

    try {
        const decoded = jwt.verify(token, jwtSecret) as { [key: string]: any };
        const decryptedId = decrypt(decoded.uuid);

        return +decryptedId;
    } catch (error) {
        throw new Error('Invalid token');
    }
};

