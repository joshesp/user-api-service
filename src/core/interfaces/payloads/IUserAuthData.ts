export interface IUserAuthData {
    email: string;
    password: string;
}

export interface IResponseToken {
    token: string, refreshToken: string
}