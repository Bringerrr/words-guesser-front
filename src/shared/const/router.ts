export enum AppRoutes {
    MAIN = 'main',
    LOGIN = 'login',
    REGISTER = 'register',
    GAMES = 'games',
    CHAT_ROOM = 'chat-room',
    FORBIDDEN = 'forbidden',
    // last
    NOT_FOUND = 'not-found',
}

export const getRouteMain = () => '/';
export const getRouteLogin = () => '/login';
export const getRouteRegister = () => '/register';
export const getRouteGames = () => '/games';
export const getRouteChatRoom = (id: string) => `/chat-room/${id}`;
export const getRouteForbidden = () => '/forbidden';
