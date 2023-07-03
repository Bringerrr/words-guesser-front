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
        const data: any = await dispatch(loginUser(values));
        if (!data?.error) {
            navigate(getRouteMain());
        }
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
                    <Box
                        display="flex"
                        flexDirection="column"
                        mt="16px"
                        gap="16px"
                        maxWidth="400px"
                    >
                        <FormikInput name="userName" label="Username" />
                        <FormikInput name="password" label="Password" />

                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                        >
                            Submit
                        </Button>
                    </Box>
                </Form>
            </Formik>
        </Box>
    );
};
