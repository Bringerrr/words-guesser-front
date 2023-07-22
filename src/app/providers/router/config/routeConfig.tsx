import { MainPage } from '@/pages/MainPage';
import { ForbiddenPage } from '@/pages/ForbiddenPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import {
    AppRoutes,
    getRouteChatRoom,
    getRouteForbidden,
    getRouteGames,
    getRouteLogin,
    getRouteMain,
    getRouteRegister,
} from '@/shared/const/router';
import { AppRoutesProps } from '@/shared/types/router';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { GamesPage } from '@/pages/GamesPage';
import { ChatPage } from '@/pages/ChatPage';

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: getRouteMain(),
        element: <GamesPage />,
        authOnly: true,
    },
    [AppRoutes.LOGIN]: {
        path: getRouteLogin(),
        element: <LoginPage />,
    },
    [AppRoutes.REGISTER]: {
        path: getRouteRegister(),
        element: <RegisterPage />,
    },
    [AppRoutes.GAMES]: {
        path: getRouteGames(),
        element: <GamesPage />,
    },
    [AppRoutes.CHAT_ROOM]: {
        path: getRouteChatRoom(':id'),
        element: <ChatPage />,
    },
    [AppRoutes.FORBIDDEN]: {
        path: getRouteForbidden(),
        element: <ForbiddenPage />,
    },
    // last
    [AppRoutes.NOT_FOUND]: {
        path: '*',
        element: <NotFoundPage />,
    },
};
