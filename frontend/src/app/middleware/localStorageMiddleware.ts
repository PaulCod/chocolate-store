// middleware/localStorageMiddleware.ts
import { Middleware } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { addProducts, clearCart, decrementProductQuantity, removeProduct } from "../features/cartSlice";

const isCartAction = (action: any): action is { type: string } => {
  return [addProducts.type, removeProduct.type, clearCart.type, decrementProductQuantity.type].includes(action.type);
};

const localStorageMiddleware: Middleware<{}, RootState> = (store) => (next) => (action) => {
  const result = next(action);

  if (isCartAction(action)) {
    const state = store.getState().cartSlice;
    localStorage.setItem("cartProducts", JSON.stringify(state.products));
    localStorage.setItem("totalAmount", JSON.stringify(state.total_amount));
  }

  return result;
};

export default localStorageMiddleware;
