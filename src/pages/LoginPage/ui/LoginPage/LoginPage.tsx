import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { Page } from '@/widgets/Page';
import { LoginForm } from '@/widgets/LoginForm';
import { getUserAuthData } from '@/entities/User';
import { getRouteMain, getRouteRegister } from '@/shared/const/router';

export const LoginPage = memo(() => {
    const auth = useSelector(getUserAuthData);
    const navigate = useNavigate();

    const onSignIn = () => {
        navigate(getRouteRegister());
    };

    if (auth) {
        return <Navigate to={getRouteMain()} replace />;
    }

    return (
        <Page>
            <Box width="100%" display="flex" justifyContent="center">
                <Box>
                    <LoginForm />
                    <Button
                        onClick={onSignIn}
                        sx={{ mt: '16px' }}
                        variant="outlined"
                    >
                        Sign in
                    </Button>
                </Box>
            </Box>
        </Page>
    );
});
