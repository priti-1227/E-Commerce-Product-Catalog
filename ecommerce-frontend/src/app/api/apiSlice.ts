import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api', // The name of the slice in your Redux state
   baseQuery: fetchBaseQuery({ 
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    // Prepare headers to add the token to every request
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  // Add the 'Cart' tag type here
  tagTypes: ['Cart', 'Product'], 
  endpoints: builder => ({}) // Endpoints will be injected from other files
});