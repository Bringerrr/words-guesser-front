import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { AuthResponse, UserLoginForm } from '../types/user';

export const authUser = createAsyncThunk<AuthResponse, UserLoginForm, ThunkConfig<string>>(
    'user/auth',
    async (formData, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;

        try {
            const response = await extra.api.post<AuthResponse>(`/auth`, formData);

            return response.data;
        } catch (e: any) {
            if (e?.response) {
                return rejectWithValue(e.response?.data?.error);
            }
            return rejectWithValue('Error');
        }
    },
);
