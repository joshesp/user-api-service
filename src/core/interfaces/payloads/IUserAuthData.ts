export interface IUserAuthData {
    email: string;
    password: string;
}

export interface IResponseToken {
    token: string,
    refreshToken: string
}

export interface IRefreshToken {
    refreshToken: string
}

export interface IUpdatePassword {
    password: string,
    token: string
}