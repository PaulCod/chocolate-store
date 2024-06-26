import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { URL_BACKEND } from "../const/const"
import { User } from "../../types/types"

type CreateUserRequest = Omit<User, "userId">

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({baseUrl: URL_BACKEND}),
  endpoints: (builder) => ({
    getUserDataById: builder.query<User, string>({
      query: (token) => ({
        url: "/users",
        headers: {
          Authorization: token
        }
      }),
    }),
    createUser: builder.mutation<void, CreateUserRequest>({
      query: (user) => ({
        url: "/users",
        method: "POST",
        body: user
      })
    })
  }),
})

export const {useGetUserDataByIdQuery, useCreateUserMutation} = userApi
