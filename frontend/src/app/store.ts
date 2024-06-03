// store.ts
import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./features/cartSlice";
import userSlice from "./features/userSlice";
import { productApi } from "./services/productApi";
import { loginApi } from "./services/loginApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userApi } from "./services/userApi";
import localStorageMiddleware from "./middleware/localStorageMiddleware";
import { orderApi } from "./services/orderApi";

export const store = configureStore({
  reducer: {
    cartSlice,
    userSlice,
    [productApi.reducerPath]: productApi.reducer,
    [loginApi.reducerPath]: loginApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productApi.middleware,
      loginApi.middleware,
      userApi.middleware,
      orderApi.middleware,
      localStorageMiddleware
    )
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
