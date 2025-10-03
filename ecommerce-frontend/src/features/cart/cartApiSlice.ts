import { apiSlice } from '../../app/api/apiSlice';
import { CartItem } from '@/lib/types';

export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query<CartItem[], void>({
      query: () => '/cart',
 
          providesTags: ['Cart'],
    }),
    addToCart: builder.mutation<CartItem, { productId: number; quantity: number }>({
      query: ({ productId, quantity }) => ({
        url: '/cart/add',
        method: 'POST',
        body: { productId, quantity },
      }),
      invalidatesTags: ['Cart'],
     
    }),

    updateCartItem: builder.mutation<CartItem, { itemId: number; quantity: number }>({
      query: ({ itemId, quantity }) => ({
        url: `/cart/items/${itemId}`,
        method: 'PUT',
        body: { quantity },
      }),
   
       invalidatesTags: ['Cart'],
    }),
    deleteCartItem: builder.mutation<{ message: string }, number>({
      query: (itemId) => ({
        url: `/cart/items/${itemId}`,
        method: 'DELETE',
      }),
     
       invalidatesTags: ['Cart'],
    }),
  }),
});

export const { 
  useGetCartQuery, 
  useAddToCartMutation,
  useUpdateCartItemMutation, 
  useDeleteCartItemMutation 
} = cartApiSlice;