import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_KEY, API_URL } from '../config';
import { GoodsItemProps } from '../components/GoodsItem/GoodsItem.props';

type GoodsResponse = { shop: GoodsItemProps[] };

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      headers.set('Authorization', API_KEY); 
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<GoodsItemProps[], void>({
      query: () => ({ url: '', params: { lang: 'en' } }),
      transformResponse: (res: GoodsResponse) => res.shop,
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
