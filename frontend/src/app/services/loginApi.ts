  import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

  interface Credentials {
    email: string
    password: string
  }

  export const loginApi = createApi({
    reducerPath: "loginApi",
    baseQuery: fetchBaseQuery({baseUrl: "http://192.168.1.7:3838"}),
    endpoints: (builder) => ({
      login: builder.mutation<void, Credentials>({
        query: (credentials: Credentials) => ({
          url: "/login",
          method: "POST",
          body: credentials
        })
      })
    })
  })

  export const {useLoginMutation} = loginApi