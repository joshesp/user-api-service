export interface IUserBaseData {
    name: string;
    lastname: string;
    email: string;
    password: string;
}

export interface IUserCreateData extends IUserBaseData {
    passwordConfirmation: string;
}

export interface IUserData extends IUserBaseData {
    lastLogin?: Date | null;
}