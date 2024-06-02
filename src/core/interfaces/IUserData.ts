export interface IUserData {
    name: string;
    lastname: string;
    email: string;
    password: string;
    lastLogin?: Date | null;
}


export interface IUserAuthData {
    email: string;
    password: string;
}

export interface IUserSession {
    id: number,
    email: string;
    iat?: number,
    exp?: number
}