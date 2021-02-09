export type State = {
    email: string
    password:  string
    isButtonDisabled: boolean
    helperText: string
    isError: boolean
    token: string
    isAuth: boolean
    userInfo: UserInfo
};

export enum UserRoles {
    Admin,
    User
}

export interface UserInfo {
    id: string;
    avatar: string;
    age: number;
    email: string;
    name: string;
    role: UserRoles;
    surname: string;
}
