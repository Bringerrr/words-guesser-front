import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { AuthResponse, UserLoginForm } from '../types/user';

export const loginUser = createAsyncThunk<AuthResponse, UserLoginForm, ThunkConfig<string>>(
    'user/login',
    async (_, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.get<AuthResponse>(`/auth/login`);

            return response.data;
        } catch (e: any) {
            if (e?.response) {
                return rejectWithValue(e.response?.data?.error);
            }
            return rejectWithValue('Error');
        }
    },
);
