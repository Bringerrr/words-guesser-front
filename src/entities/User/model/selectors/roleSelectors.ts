import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';
import { UserRole } from '../consts/userConsts';

export const getUserRole = (state: StateSchema) => state.user.authData?.role;

export const isUserAdmin = createSelector(getUserRole, (role) => role === UserRole.ADMIN);
