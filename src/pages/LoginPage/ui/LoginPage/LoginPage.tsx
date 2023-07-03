import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Page } from '@/widgets/Page';
import { LoginForm } from '@/widgets/LoginForm';
import { getUserAuthData } from '@/entities/User';
import { getRouteMain } from '@/shared/const/router';

export const LoginPage = memo(() => {
    const auth = useSelector(getUserAuthData);

    if (auth) {
        return <Navigate to={getRouteMain()} replace />;
    }

    return (
        <Page>
            <LoginForm />
        </Page>
    );
});
