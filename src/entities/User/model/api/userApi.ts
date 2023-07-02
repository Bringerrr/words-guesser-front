import { rtkApi } from '@/shared/api/rtkApi';
import { User } from '../types/user';

const userApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getUserById: build.query<User, string>({
            query: (id) => ({
                url: `/profile/${id}`,
            }),
        }),
    }),
});

export const useUser = userApi.useGetUserByIdQuery;
