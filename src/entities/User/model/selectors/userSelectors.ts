import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';
import { UserRole } from '../consts/userConsts';

export const getUserRole = (state: StateSchema) => state.user.authData?.role;
export const getUserDisplayName = (state: StateSchema) => state.user?.authData?.displayName;
export const getUserImage = (state: StateSchema) => state.user?.authData?.image;

export const isUserAdmin = createSelector(getUserRole, (role) => role === UserRole.ADMIN);
