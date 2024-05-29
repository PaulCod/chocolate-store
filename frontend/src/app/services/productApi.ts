import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"


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
  baseQuery: fetchBaseQuery({baseUrl: "http://192.168.1.7:3838"}),
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