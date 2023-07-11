import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { Page } from '@/widgets/Page';
import { getUserAuthData } from '@/entities/User';
import { getRouteLogin, getRouteMain } from '@/shared/const/router';
import { RegisterForm } from '@/features/RegisterForm';

export const RegisterPage = memo(() => {
    const auth = useSelector(getUserAuthData);
    const navigate = useNavigate();

    const onSignIn = () => {
        navigate(getRouteLogin());
    };

    if (auth) {
        return <Navigate to={getRouteMain()} replace />;
    }

    return (
        <Page>
            <Box width="100%" display="flex" justifyContent="center">
                <Box>
                    <RegisterForm />
                    <Button
                        onClick={onSignIn}
                        sx={{ mt: '16px' }}
                        variant="outlined"
                    >
                        Log in
                    </Button>
                </Box>
            </Box>
        </Page>
    );
});
