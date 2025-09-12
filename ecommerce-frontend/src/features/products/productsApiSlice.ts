import { apiSlice } from '../../app/api/apiSlice';
import { Product } from '@/lib/types';

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Note: We use 'query' for GET requests and 'mutation' for CUD requests.
    getProducts: builder.query<Product[], void>({
      query: () => '/products',
    }),
    getProductById: builder.query<Product, string>({
        query: (id) => `/products/${id}`,
    }),
  }),
});

// RTK Query automatically generates hooks for each endpoint we define.
export const { useGetProductsQuery, useGetProductByIdQuery } = productsApiSlice;