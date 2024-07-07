import crypto, { randomBytes } from 'crypto';
import { ENCRYPTION_KEY } from '../config/env';

const KEY = Buffer.from(ENCRYPTION_KEY);
const IV = Buffer.from(ENCRYPTION_KEY.slice(-16));

export const encrypt = (text: string): string => {
    let cipher = crypto.createCipheriv('aes-256-cbc', KEY, IV);
    let encrypted = cipher.update(text, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
}

export const decrypt = (text: string): string => {
    let decipher = crypto.createDecipheriv('aes-256-cbc', KEY, IV);
    let decrypted = decipher.update(text, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

export const generateRandomToken = (): string => {
    const tokenBytes = randomBytes(32);
    return tokenBytes.toString('hex');
};