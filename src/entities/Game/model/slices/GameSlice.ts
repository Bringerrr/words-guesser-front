import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Game, GameSchema } from '../types/GameSchema';
import { getGames } from '../services/getGames';

const initialState: GameSchema = {
    isLoading: false,
};

export const GameSlice = createSlice({
    name: 'Game',
    initialState,
    reducers: {
        selectGame: (state, action: PayloadAction<Game>) => {
            state.currentData = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getGames.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getGames.fulfilled, (state, action) => {
                state.dataList = action.payload;
                state.isLoading = false;
            })
            .addCase(getGames.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export const { actions: GameActions } = GameSlice;
export const { reducer: GameReducer } = GameSlice;
