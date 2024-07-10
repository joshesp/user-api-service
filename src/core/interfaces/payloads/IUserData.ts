export interface IUserBase {
    name: string;
    lastname: string;
    email: string;
}

/**
 * Campos de la entidad para crear un usuario
 * @tsoaModel
 * @example
 * {
 *   "name": "Jonh",
 *   "lastname": "Doe",
 *   "email": "jonh@mail.com",
 *   "password": "password0@",
 *   "passwordConfirmation": "password0@"
 * }
 */
export interface IUserCreate extends IUserBase {
    password: string;
    passwordConfirmation: string;
}

/**
 * Campos de la entidad para crear un usuario
 * @tsoaModel
 * @example
 * {
 *   "name": "Jonh",
 *   "lastname": "Doe",
 *   "email": "jonh@mail.com",
 *   "lastLogin": "2020-01-01T00:00:00.000Z"
 * }
 */
export interface IUser extends IUserBase {
    lastLogin?: Date | null;
}