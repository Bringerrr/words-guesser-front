import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {};

export const WordSlice = createSlice({
    name: 'Word',
    initialState,
    reducers: {
        template: (state, action: PayloadAction<string>) => {},
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

export const { actions: WordActions } = WordSlice;
export const { reducer: WordReducer } = WordSlice;
