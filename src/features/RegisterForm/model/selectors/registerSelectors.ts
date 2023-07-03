import { StateSchema } from '@/app/providers/StoreProvider';

export const regIsSucceeded = (state: StateSchema) => state.registerForm.isSucceeded;
export const regErrors = (state: StateSchema) => state.registerForm.error;
