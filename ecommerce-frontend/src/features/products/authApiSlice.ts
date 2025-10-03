import { apiSlice } from '../../app/api/apiSlice';
import { User } from '@/lib/types';

// Define a type for the login response, which should include the token
interface AuthResponse {
  token: string;
  user: Omit<User, 'password_hash'>;
}

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    
    // The 'register' mutation
    register: builder.mutation<User, Omit<User, 'id'>>({
      query: (credentials) => ({
        url: '/auth/register',
        method: 'POST',
        body: credentials,
      }),
    }),

    // The 'login' mutation
    login: builder.mutation<AuthResponse, Omit<User, 'id' | 'name'>>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),

  }),
});

// Export the auto-generated hooks for use in your components
export const { useRegisterMutation, useLoginMutation } = authApiSlice;