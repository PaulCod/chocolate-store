import {configureStore} from "@reduxjs/toolkit"
import cartSlice from "./features/cartSlice"
import userSlice from "./features/userSlice"

export const store = configureStore({
  reducer: {
    cartSlice,
    userSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch