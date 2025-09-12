import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';

export const store = configureStore({
  reducer: {
    // Add the generated reducer
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling, etc.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});