import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import { getUserAuthData, getUserRole, UserRole } from '@/entities/User';
import { getRouteForbidden, getRouteLogin } from '@/shared/const/router';

interface RequireAuthProps {
    children: JSX.Element;
    roles?: UserRole[];
}

export function RequireAuth({ children, roles }: RequireAuthProps) {
    const auth = useSelector(getUserAuthData);

    const location = useLocation();
    const userRole = useSelector(getUserRole);

    const hasRequiredRole = useMemo(() => {
        if (!roles || !userRole) {
            return true;
        }

        return roles?.includes(userRole);
    }, [roles, userRole]);

    if (!auth) {
        return (
            <Navigate to={getRouteLogin()} state={{ from: location }} replace />
        );
    }

    if (!hasRequiredRole) {
        return (
            <Navigate
                to={getRouteForbidden()}
                state={{ from: location }}
                replace
            />
        );
    }

    return children;
}
