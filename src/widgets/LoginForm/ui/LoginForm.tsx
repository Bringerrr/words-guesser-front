import { Box, Button } from '@mui/material';
import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import FormikInput from '@/shared/ui/FormikInput/FormikInput';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { loginUser } from '@/entities/User/model/services/loginUser';
import { getRouteMain } from '@/shared/const/router';

export const LoginForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const initialValues = {
        userName: '',
        password: '',
    };

    const validationSchema = Yup.object({
        userName: Yup.string().required('Required'),
        password: Yup.string().required('Required'),
    });

    const onSubmit = async (values: any) => {
        await dispatch(loginUser(values));
        navigate(getRouteMain());
    };

    return (
        <Box>
            <h4>Login Form</h4>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                <Form>
                    <FormikInput name="userName" label="username" />
                    <FormikInput name="password" label="password" />

                    <Button type="submit" color="primary" variant="contained">
                        Submit
                    </Button>
                </Form>
            </Formik>
        </Box>
    );
};
