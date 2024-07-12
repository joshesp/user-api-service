
import { Body, Controller, Post, Response, Route, Tags } from "tsoa";
import { LABEL_MESSAGES_ERROR } from "../config/constanst";
import AppError from "../core/errors/AppError";
import { IAuthSerice } from "../core/interfaces/auth/IAuthService";
import { IAuthToken, IRefreshToken, IUpdatePassword, IUserAuth } from "../core/interfaces/payloads/IUserAuthData";
import { IUserCreate } from "../core/interfaces/payloads/IUserData";
import { User } from "../entity/User";
import PasswordResetRepository from "../repositories/PasswordResetRepository";
import UserRepository from "../repositories/UserRepository";
import { generateRandomToken } from "../utils/cryptoUtils";
import { generateToken, verifyToken } from "../utils/jwt";

/**
 * Manejo de la autenticación y registro de usuarios
 */
@Route("auth")
@Tags("Autenticación")
class AuthService extends Controller implements IAuthSerice {
    private userRepository: UserRepository;
    private passwordResetProv: PasswordResetRepository;

    constructor() {
        super();

        this.userRepository = new UserRepository();
        this.passwordResetProv = new PasswordResetRepository();
    }

    public async autheticateByIdAndEmail(
        credentials: { email: string, id: number }
    ): Promise<User> {
        try {
            const user = await this.userRepository.findByEmailAndId(credentials);

            this.verifyUserStatus(user);

            return user!;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Validación de credenciales para el acceso de un usuario
     */
    @Post('login')
    @Response<string>(
        403,
        'Unauthorized error',
        'Sorry, the credentials are incorrect.'
    )
    @Response<string>(
        500,
        'System error',
        'Sorry, something went wrong.'
    )
    public async authenticate(
        @Body() { email, password }: IUserAuth
    ): Promise<IAuthToken> {
        try {
            const user = await this.userRepository.findByEmail(email);

            this.verifyUserStatus(user);

            const requestPasswordReset = await this.passwordResetProv.findByUser(
                user!.id
            );

            if (requestPasswordReset) {
                throw new AppError(LABEL_MESSAGES_ERROR.RESET_PASSWORD_REQ, 403);
            }

            const isValidPassword = await user!.validatePassword(password);

            if (!isValidPassword) {
                throw new AppError(LABEL_MESSAGES_ERROR.INVALID_PASSWORD, 403);
            }

            const token = generateToken({ id: user!.id, email: user!.email });
            const refreshToken = generateToken(
                { id: user!.id, email: user!.email }, true
            );

            return { token, refreshToken };
        } catch (error) {
            throw error;
        }
    };

    /**
     * Creación de un usuario
     */
    @Post('register')
    @Response<string>(
        201,
        'No content',
    )
    @Response<string>(
        400,
        'Bad request error',
        'Sorry, the request is invalid.'
    )
    @Response<string>(
        500,
        'System error',
        'Sorry, something went wrong.'
    )
    public async register(@Body() user: IUserCreate): Promise<number> {
        try {
            const newUser = await this.userRepository.createUser(user);

            return newUser.id;
        } catch (error) {
            throw error;
        }
    };

    /**
     * Actualización del token de acceso
     */
    @Post('refresh-token')
    @Response<string>(
        403,
        'Unauthorized error',
        'Sorry, the credentials are incorrect.'
    )
    @Response<string>(
        500,
        'System error',
        'Sorry, something went wrong.'
    )
    public async refreshAccessToken(
        @Body() { token }: IRefreshToken
    ): Promise<IAuthToken> {
        try {
            const decoded = verifyToken(token, true);
            const newToken = generateToken(decoded);
            const refreshToken = generateToken(decoded, true);

            return { token: newToken, refreshToken };
        } catch (error) {
            throw new AppError(LABEL_MESSAGES_ERROR.TOKEN_NOT_FOUND, 401);
        }
    }

    /**
     * Solicitud de restablecimiento de contraseña
     */
    @Post('request-password-reset')
    @Response<string>(
        404,
        'Not found error',
        'Sorry, the user does not exist.'
    )
    @Response<string>(
        500,
        'System error',
        'Sorry, something went wrong.'
    )
    public async requestPasswordResetUser(@Body() { email }: { email: string }): Promise<void> {
        try {
            const user = await this.userRepository.findByEmail(email);

            this.verifyUserStatus(user);

            const requestPasswordReset = await this.passwordResetProv.findByUser(
                user!.id
            );

            if (requestPasswordReset) {
                await this.passwordResetProv.deleteByUser(user!.id);
            }

            const token = generateRandomToken();

            await this.passwordResetProv.create(user!.id, token);

            // TODO: Send link or code (email/sms) to user
        } catch (error) {
            throw error;
        }
    }

    /**
     * Actualización de la contraseña
     */
    @Post('update-password')
    @Response<string>(
        400,
        'Bad request error',
        'Sorry, the request is invalid.'
    )
    @Response<string>(
        500,
        'System error',
        'Sorry, something went wrong.'
    )
    public async resetPassword(@Body() { token, password }: IUpdatePassword): Promise<void> {
        try {
            const tokenData = await this.passwordResetProv.findByToken(token);

            if (!tokenData) {
                throw new AppError(LABEL_MESSAGES_ERROR.TOKEN_NOT_FOUND, 401);
            }

            const timeDifferenceInMinutes = Math.round(
                (Date.now() - tokenData.createdAt.getTime()) / (1000 * 60)
            );

            if (timeDifferenceInMinutes > 20) {
                throw new AppError(LABEL_MESSAGES_ERROR.TOKEN_EXPIRED, 401);
            }

            const user = await this.userRepository.findById(tokenData.userId);

            if (!user) {
                throw new AppError(LABEL_MESSAGES_ERROR.USER_NOT_FOUND, 401);
            }

            user.password = password;

            await this.userRepository.updateUser(user);
            await this.passwordResetProv.deleteByUser(user.id);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Se valida si el usario existe y no esta bloqueado
     */
    private verifyUserStatus(user: User | null): void {
        if (!user) {
            throw new AppError(LABEL_MESSAGES_ERROR.USER_NOT_FOUND, 401);
        }

        if (user.isAccountBlocked) {
            throw new AppError(LABEL_MESSAGES_ERROR.USER_BLOCKED, 401);
        }
    }
}

export default new AuthService();
