import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WordsListSchema } from '../types/WordsListSchema';

const initialState: WordsListSchema = {
    
};

export const WordsListSlice = createSlice({
    name: 'WordsList',
    initialState,
    reducers: {
        template: (state, action: PayloadAction<string>) => {
           
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(, (state) => {
    //             state.error = undefined;
    //             state.isLoading = true;
    //         })
    //         .addCase(, (state) => {
    //             state.isLoading = false;
    //         })
    //         .addCase(, (state, action) => {
    //             state.isLoading = false;
    //             state.error = action.payload;
    //         });
    // },
});

export const { actions: WordsListActions } = WordsListSlice;
export const { reducer: WordsListReducer } = WordsListSlice;