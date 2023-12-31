import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import { TOKEN_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { UserSchema, User, AuthResponse } from '../types/user';
import { loginUser } from '../services/loginUser';
import { authUser } from '../services/authUser';

const initialState: UserSchema = {
    _inited: false,
    isLoading: false,
    isAuthLoading: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<User>) => {
            state.authData = action.payload;
        },
        initAuthData: (state) => {
            state._inited = true;
        },
        logout: (state) => {
            state.authData = undefined;
            localStorage.removeItem(TOKEN_LOCALSTORAGE_KEY);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
                const { token } = action.payload;
                const userData = jwtDecode<User>(token);

                localStorage.setItem(TOKEN_LOCALSTORAGE_KEY, token);

                state.authData = userData;
                state.isLoading = false;
                toast.success('Log in: success');
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.payload;

                toast.error(action.payload);
            })
            .addCase(authUser.pending, (state) => {
                state.error = undefined;
                state.isAuthLoading = true;
            })
            .addCase(authUser.fulfilled, (state, action: PayloadAction<User>) => {
                const authData = action.payload;

                state.authData = authData;
                state.isAuthLoading = false;
            })
            .addCase(authUser.rejected, (state, action) => {
                state.error = action.payload;
                toast.error(action.payload);
            });
    },
});

// Action creators are generated for each case reducer function
export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
