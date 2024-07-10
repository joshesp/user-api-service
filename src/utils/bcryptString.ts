import bcrypt from 'bcryptjs';

/**
 * Hahs un string
 */
export const bcryptString = (text: string): string => {
    const salt = bcrypt.genSaltSync()

    return bcrypt.hashSync(text, salt)
};
