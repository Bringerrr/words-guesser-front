import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { User } from '../types/user';

export const authUser = createAsyncThunk<User, void, ThunkConfig<string>>('user/auth', async (_, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.get<User>(`/auth`);

        return response.data;
    } catch (e: any) {
        if (e?.response) {
            return rejectWithValue(e.response?.data?.error);
        }
        return rejectWithValue('Error');
    }
});
