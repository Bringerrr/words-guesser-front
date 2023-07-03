import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { AuthResponse, UserLoginForm } from '../types/user';

export const loginUser = createAsyncThunk<AuthResponse, UserLoginForm, ThunkConfig<string>>(
    'user/login',
    async (formData, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.post<AuthResponse>(`/auth/login`, formData);

            return response.data;
        } catch (e) {
            return rejectWithValue('error');
        }
    },
);
