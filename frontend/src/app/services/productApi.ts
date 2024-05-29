import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query"

export const productApiSlice = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({baseUrl: "http://localhost:3838"}),
  endpoints: (builder) => ({}),
})
