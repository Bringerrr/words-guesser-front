import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { UserRegisterForm } from '../types/registerFormTypes';

interface RegisterUserArgs {
    data: UserRegisterForm;
    onError: (error: any) => void;
}

export const registerUser = createAsyncThunk<any, RegisterUserArgs, ThunkConfig<string>>(
    'user/register',
    async ({ data, onError }, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.post<any>(`/auth/register`, data);

            return response.data;
        } catch (e: any) {
            if (e?.response) {
                const error = e.response?.data?.error || e.response?.data?.errors;
                onError(error);
                return rejectWithValue(e.response?.data?.error);
            }
            return rejectWithValue('Error');
        }
    },
);
