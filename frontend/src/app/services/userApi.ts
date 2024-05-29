import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

interface User {
  id: string
  name: string
  email: string,
  password: string
}

type UserApiResponse = Omit<User, "password">

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({baseUrl: "http://192.168.1.7:3838"}),
  endpoints: (builder) => ({
    getUserDataById: builder.query<UserApiResponse, void>({
      query: (id) => `/user/${id}`,
    }),
    createUser: builder.mutation<void, User>({
      query: (user) => ({
        url: "/user",
        method: "POST",
        body: user
      })
    })
  }),
})

export const {useGetUserDataByIdQuery, useCreateUserMutation} = userApi
