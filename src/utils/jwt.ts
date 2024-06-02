import jwt from 'jsonwebtoken';
import { JWT_EXPIRATION, JWT_SECRET } from '../config/env';
import { IUserSession } from '../core/interfaces/IUserData';
import { decrypt, encrypt } from './cryptoUtils';

export const generateToken = (payload: IUserSession): string => {
    const encryptedId = encrypt(`${payload.id}`);
    const tokenPayload = { id: encryptedId, email: payload.email };
    return jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
};

export const verifyToken = (token: string): IUserSession => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string, email: string };
        const decryptedId = decrypt(decoded.id);

        return { ...decoded, id: +decryptedId };
    } catch (error) {
        throw new Error('Invalid token');
    }
};
