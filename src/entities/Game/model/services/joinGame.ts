import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Game } from '../types/GameSchema';

export const joinGame = createAsyncThunk<Game[], string, ThunkConfig<string>>('games/join', async (gameId, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.post<Game[]>(`/games/${gameId}/join`);

        return response.data;
    } catch (e: any) {
        if (e?.response) {
            return rejectWithValue(e.response?.data?.error || e.response?.data?.errors);
        }
        return rejectWithValue('Error');
    }
});
