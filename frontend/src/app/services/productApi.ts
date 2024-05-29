import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { URL_BACKEND } from "../const/const"


interface Product {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
  quantity: number
}

interface ProductApiResponse {
  products: Product[]
}

export const productApi = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({baseUrl: URL_BACKEND}),
  endpoints: (builder) => ({
    getAllProducts: builder.query<ProductApiResponse, void>({
      query: () => "/products",
    }),
    getProductById: builder.query<Product, void>({
      query: (id) => `/products/${id}`,
    })
  }),
})

export const {useGetAllProductsQuery, useGetProductByIdQuery} = productApi