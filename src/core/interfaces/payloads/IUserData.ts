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