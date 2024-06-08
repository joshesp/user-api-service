import crypto, { randomBytes } from 'crypto';
import { ENCRYPTION_KEY } from '../config/env';

const cryptoKey = crypto
    .createHash('sha512')
    .update(ENCRYPTION_KEY)
    .digest('hex')
    .substring(0, 32)
const encryptionIV = crypto
    .createHash('sha512')
    .update(Buffer.alloc(32, 0))
    .digest('hex')
    .substring(0, 16)

export const encrypt = (text: string): string => {
    const cipher = crypto.createCipheriv('aes-256-cbc', cryptoKey, encryptionIV)
    return Buffer.from(
        cipher.update(text, 'utf8', 'hex') + cipher.final('hex')
    ).toString('base64');
};

export const decrypt = (text: string): string => {
    const buff = Buffer.from(text, 'base64')
    const decipher = crypto.createDecipheriv('aes-256-cbc', cryptoKey, encryptionIV)
    return (
        decipher.update(buff.toString('utf8'), 'hex', 'utf8') +
        decipher.final('utf8')
    )
};

export const generateRandomToken = (): string => {
    const tokenBytes = randomBytes(32); // Generate 32 random bytes
    return tokenBytes.toString('hex'); // Convert to hexadecimal string
};