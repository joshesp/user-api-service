/**
 * Campos de la entidad para la autenticación
 * @tsoaModel
 * @example
 * {
 *   "email": "johndoe@mail.com",
 *   "password": "johnDoe20!@"
 * }
 */
export interface IUserAuth {
    /**
     * Correo electronico del usuario
     */
    email: string;
    /**
     * Conrntraseña del usuario
     */
    password: string;
}

/**
 * Entidad con los datos de la autenticación
 * @tsoaModel
 * @example
 * {
 *   "token": "eias921as...",
 *   "refreshToken": "eias921as..."
 * }
 */
export interface IAuthToken {
    /**
     * JWT del usuario
     */
    token: string,
    /**
     * Token de refresco del usuario
     */
    refreshToken: string
}

/**
 * Entidad para el token de refresco
 * @tsoaModel
 * @example
 * {
 *   "refreshToken": "eias921as..."
 * }
 */
export interface IRefreshToken {
    /**
     * Token de refresco del usuario
     */
    refreshToken: string
}

/**
 * Entidad para la actualización de la contraseña
 * @tsoaModel
 * @example
 * {
 *   "password": "@twsY76w",
 *   "token": "eias921as..."
 * }
 */
export interface IUpdatePassword {
    /**
     * Contraseña del usuario
     */
    password: string,
    /**
     * Token para la actualización de la contraseña
     */
    token: string
}