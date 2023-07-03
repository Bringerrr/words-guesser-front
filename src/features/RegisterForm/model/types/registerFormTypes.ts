export interface UserRegisterForm {
    userName: string;
    password: string;
    email: string;
    displayName: string;
}

export interface UserRegisterSchema {
    isLoading: boolean;
    isSucceeded: boolean;
    error?: any;
}
