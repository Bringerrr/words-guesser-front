import { UserRole } from '../consts/userConsts';

export interface User {
    displayName: string;
    id: string;
    email: string;
    role?: UserRole;
}

export interface UserLoginForm {
    userName: string;
    password: string;
}

export interface AuthResponse {
    token: string;
}

export interface UserSchema {
    authData?: User;
    error?: any;
    isLoading: boolean;
    _inited: boolean;
}
