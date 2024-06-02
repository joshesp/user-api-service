import bcrypt from 'bcryptjs';

export const bcryptString = (text: string): string => {
    const salt = bcrypt.genSaltSync()

    return bcrypt.hashSync(text, salt)
};
