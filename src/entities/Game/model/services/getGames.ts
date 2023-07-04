import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Game } from '../types/GameSchema';

export const getGames = createAsyncThunk<Game[], void, ThunkConfig<string>>('games/get', async (_, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.get<Game[]>(`/games`);

        return response.data;
    } catch (e: any) {
        if (e?.response) {
            return rejectWithValue(e.response?.data?.error || e.response?.data?.errors);
        }
        return rejectWithValue('Error');
    }
});
