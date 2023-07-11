import { Box, Button } from '@mui/material';
import { Formik, Form } from 'formik';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import FormikInput from '@/shared/ui/FormikInput/FormikInput';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { UserLoginForm } from '@/entities/User/model/types/user';
import { regIsSucceeded } from '../model/selectors/registerSelectors';
import { registerUser } from '../model/services/registerUser';
import { getRouteLogin } from '@/shared/const/router';

export const RegisterForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isSucceeded = useSelector(regIsSucceeded);

    useEffect(() => {
        if (isSucceeded) {
            navigate(getRouteLogin());
        }
    }, [isSucceeded, navigate]);

    const initialValues = {
        userName: '',
        password: '',
        displayName: '',
        email: '',
    };

    const validationSchema = Yup.object({
        userName: Yup.string().required('Required'),
        password: Yup.string().required('Required'),
        email: Yup.string()
            .email('Must contain valid email')
            .required('Required'),
        displayName: Yup.string().required('Required'),
    });

    const onSubmit = async (values: UserLoginForm, helpers: any) => {
        await dispatch(
            registerUser({ data: values, onError: helpers.setErrors }),
        );
    };

    return (
        <Box>
            <h4>Register Form</h4>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                <Form>
                    <Box
                        display="flex"
                        flexDirection="column"
                        gap="8px"
                        mb="16px"
                    >
                        <FormikInput name="userName" label="Username" />
                        <FormikInput name="displayName" label="Display name" />
                        <FormikInput name="email" label="Email" />
                        <FormikInput name="password" label="Password" />
                    </Box>
                    <Button
                        fullWidth
                        type="submit"
                        color="primary"
                        variant="contained"
                    >
                        Submit
                    </Button>
                </Form>
            </Formik>
        </Box>
    );
};
