import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"

interface Product {
  id: string, 
  name: string,
  price: number,
  imageUrl: string
  quantity: number
}

interface CartSlice {
  products: Product[],
  total_amount: number
}

const initialState: CartSlice = {
  products: [],
  total_amount: 0
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProducts: (state, action: PayloadAction<Product>) => {
      const newProduct = action.payload

      const existingProductIndex = state.products.findIndex(product => product.id === newProduct.id)
      if(existingProductIndex !== -1) {
        state.products[existingProductIndex].quantity += newProduct.quantity 
      } else {
        state.products.push(newProduct)
      }

      state.total_amount += newProduct.price * newProduct.quantity
    },

    removeProduct: (state, action: PayloadAction<string>) => {
      const productId = action.payload

      const productToRemoveIndex = state.products.findIndex(product => product.id === productId)
      if(productToRemoveIndex !== -1) {
        const productToRemove = state.products[productToRemoveIndex]

        state.total_amount -= productToRemove.price * productToRemove.quantity
        state.products.splice(productToRemoveIndex, 1)
      }
    },

    clearCart: (state) => {
      state.products = []
      state.total_amount = 0
    },

    decrementProductQuantity: (state, action: PayloadAction<string>) => {
      const productIdToDecrement = action.payload;
      const productToDecrementIndex = state.products.findIndex(product => product.id === productIdToDecrement);
      if (productToDecrementIndex !== -1) {
        const productToDecrement = state.products[productToDecrementIndex];
        if (productToDecrement.quantity > 1) {
          productToDecrement.quantity--;
          state.total_amount -= productToDecrement.price;
        } else {
          state.products.splice(productToDecrementIndex, 1);
          state.total_amount -= productToDecrement.price;
        }
      }
    }
    
  }
})

export const {addProducts, removeProduct, clearCart, decrementProductQuantity} = cartSlice.actions
export const selectCartProduct = (state: RootState) => state.cartSlice.products
export const selectCartTotalAmount = (state: RootState) => state.cartSlice.total_amount
export default cartSlice.reducer