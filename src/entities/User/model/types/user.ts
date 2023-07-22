import { UserRole } from '../consts/userConsts';

export interface User {
    displayName: string;
    id: string;
    email: string;
    role?: UserRole;
    image: string;
    userName: string;
}

export interface UserLoginForm {
    userName: string;
    password: string;
    email: string;
    displayName: string;
}

export interface UserRegisterForm {
    userName: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    image: string;
}

export interface UserSchema {
    authData?: User;
    error?: any;
    isLoading: boolean;
    isAuthLoading: boolean;
    _inited: boolean;
}
