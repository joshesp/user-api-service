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
 *   "email": "johndoe@mail.com",
 *   "password": "johnDoe20!@",
 *   "passwordConfirmation": "johnDoe20!@"
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