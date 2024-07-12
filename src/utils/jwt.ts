import jwt from 'jsonwebtoken';
import {
    APP_JWT_EXPIRES_IN,
    APP_JWT_REFRESH_EXPIRES_IN,
    APP_JWT_REFRESH_SECRET,
    APP_JWT_SECRET
} from '../config/env';
import { decrypt, encrypt } from './cryptoUtils';

/**
 * En base si el token es para refrescar o validar se retorna el valode del
 * secret
 */
const jwtValuesEnv = (
    isRefreshToken: boolean
): { jwtSecret: string, jwtExpiresIn: string } => {
    return {
        jwtSecret: isRefreshToken ? APP_JWT_REFRESH_SECRET : APP_JWT_SECRET,
        jwtExpiresIn: isRefreshToken ? APP_JWT_REFRESH_EXPIRES_IN : APP_JWT_EXPIRES_IN
    };
}

/**
 * Generación de un nuevo JWT token (authenticar/refrescar)
 */
export const generateToken = (
    data: { id: number, email: string }, isRefreshToken = false
): string => {
    const { jwtSecret, jwtExpiresIn } = jwtValuesEnv(isRefreshToken);
    const encryptedId = encrypt(`${data.id}`);
    const encryptedEmail = encrypt(data.email);
    const payload = { uuid: encryptedId, email: encryptedEmail };

    return jwt.sign(
        payload, jwtSecret, { expiresIn: jwtExpiresIn, algorithm: "HS256" }
    );
};

/**
 * Verificación y decodificación de JWT token
 */
export const verifyToken = (
    token: string, isRefreshToken = false
): { id: number, email: string } => {
    const { jwtSecret } = jwtValuesEnv(isRefreshToken);

    try {
        const decoded = jwt.verify(
            token, jwtSecret, { algorithms: ["HS256"] }
        ) as { [key: string]: any };
        const decryptedId = decrypt(decoded.uuid);
        const decryptedEmail = decrypt(decoded.email);

        return { id: +decryptedId, email: decryptedEmail };
    } catch (error) {
        throw new Error('Invalid token');
    }
};

