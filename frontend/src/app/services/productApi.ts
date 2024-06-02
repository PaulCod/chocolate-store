import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { URL_BACKEND } from "../const/const"
import { Product } from "../../types/types"

export const productApi = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({baseUrl: URL_BACKEND}),
  endpoints: (builder) => ({
    getAllProducts: builder.query<Product[], void>({
      query: () => "/products",
    }),
    getProductById: builder.query<Product[], string>({
      query: (id) => `/products/${id}`,
    })
  }),
})

export const {useGetAllProductsQuery, useGetProductByIdQuery} = productApi