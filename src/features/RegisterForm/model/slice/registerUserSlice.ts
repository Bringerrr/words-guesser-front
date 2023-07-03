import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { UserRegisterSchema } from '../types/registerFormTypes';
import { registerUser } from '../services/registerUser';

const initialState: UserRegisterSchema = {
    isLoading: false,
    isSucceeded: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.isSucceeded = true;
                state.isLoading = false;

                toast.success('Register: success');
            });
    },
});

// Action creators are generated for each case reducer function
export const { actions: userRegisterActions } = userSlice;
export const { reducer: userRegisterReducer } = userSlice;
