import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { URL_BACKEND } from "../const/const";

  interface Credentials {
    email: string
    password: string
  }

  export const loginApi = createApi({
    reducerPath: "loginApi",
    baseQuery: fetchBaseQuery({baseUrl: URL_BACKEND}),
    endpoints: (builder) => ({
      login: builder.mutation<{token: string}, Credentials>({
        query: (credentials: Credentials) => ({
          url: "/login",
          method: "POST",
          body: credentials
        })
      })
    })
  })

  export const {useLoginMutation} = loginApi