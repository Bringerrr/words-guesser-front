import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Page } from '@/widgets/Page';
import { getUserAuthData } from '@/entities/User';
import { getRouteMain } from '@/shared/const/router';
import { RegisterForm } from '@/features/RegisterForm';

export const RegisterPage = memo(() => {
    const auth = useSelector(getUserAuthData);

    if (auth) {
        return <Navigate to={getRouteMain()} replace />;
    }

    return (
        <Page>
            <RegisterForm />
        </Page>
    );
});
