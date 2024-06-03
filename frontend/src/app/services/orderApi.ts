import {createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { URL_BACKEND } from "../const/const"

interface Items {
  chocolateId: string
  quantity: number
}

interface OrderRequest {
  order: {
    status: string
    totalAmount: number
  },
  items: Items[]
}

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({baseUrl: URL_BACKEND}),
  endpoints: (builder) => ({
    getAllOrders: builder.query<any, string>({
      query: (token) => ({
        url: "/orders",
        headers: {
          Authorization: token
        }
      }),
    }),

    getOrderById: builder.query<any, {id: string, token: string}>({
      query: ({id, token}) => ({
        url: `/orders/${id}`,
        headers: {
          Authorization: token
        }
      })
    }),

    createOrder: builder.mutation<any, {order: OrderRequest, token: string}>({
      query: ({order, token}) => ({
        url: "/orders",
        method: "POST",
        body: order,
        headers: {
          Authorization: token
        }
      })
    })
  })
})

export const {useCreateOrderMutation, useGetAllOrdersQuery, useGetOrderByIdQuery} = orderApi