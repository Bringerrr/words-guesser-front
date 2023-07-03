import { TextField } from '@mui/material';
import { useField } from 'formik';

interface FormikInputProps {
    name: string;
    label: string;
    readOnly?: boolean;
}

const FormikInput = ({ name, label, readOnly }: FormikInputProps) => {
    const [{ value, onBlur, onChange }, { touched, error }] = useField(name);

    return (
        <TextField
            id={name}
            label={label}
            variant="outlined"
            fullWidth
            value={value || ''}
            onChange={onChange}
            onBlur={onBlur}
            error={touched && Boolean(error)}
            InputProps={{
                readOnly,
            }}
        />
    );
};

export default FormikInput;
