export enum AppRoutes {
    MAIN = 'main',
    LOGIN = 'login',
    REGISTER = 'register',
    FORBIDDEN = 'forbidden',
    // last
    NOT_FOUND = 'not_found',
}

export const getRouteMain = () => '/';
export const getRouteLogin = () => '/login';
export const getRouteRegister = () => '/register';
export const getRouteForbidden = () => '/forbidden';
