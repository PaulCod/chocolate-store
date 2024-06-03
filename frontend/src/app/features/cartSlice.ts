import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { Product } from "../../types/types"

interface CartSlice {
  products: Product[],
  total_amount: number
}

const loadStateFromLocalStorage = (): CartSlice => {
  const cartProducts = localStorage.getItem("cartProducts")
  const totalAmount = localStorage.getItem("totalAmount")

  return {
    products: cartProducts? JSON.parse(cartProducts) : [],
    total_amount: totalAmount ? JSON.parse(totalAmount): 0
  }
}

const initialState = loadStateFromLocalStorage()

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProducts: (state, action: PayloadAction<Product>) => {
      const newProduct = action.payload

      const productWithPrice = {...newProduct, price: Number(newProduct.price.toString())}

      const existingProductIndex = state.products.findIndex(product => product.id === productWithPrice.id)
      if(existingProductIndex !== -1) {
        state.products[existingProductIndex].quantity += 1
      } else {
        const product = {...productWithPrice, quantity: 1}
        state.products.push(product)
      }

      state.total_amount += productWithPrice.price

      localStorage.setItem("cartProducts", JSON.stringify(state.products))
      localStorage.setItem("totalAmount", JSON.stringify(state.total_amount))
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
      const productIdToDecrement = action.payload
      const productToDecrementIndex = state.products.findIndex(product => product.id === productIdToDecrement)
          
      if (productToDecrementIndex !== -1) {
        const productToDecrement = state.products[productToDecrementIndex]
        if (productToDecrement.quantity > 1) {
          productToDecrement.quantity--
          if (typeof productToDecrement.price === 'number') {
            state.total_amount -= productToDecrement.price
          }
        } else {
          state.products.splice(productToDecrementIndex, 1)
          if (typeof productToDecrement.price === 'number') {
            state.total_amount -= productToDecrement.price
          }
        }
      }

      localStorage.setItem("cartProducts", JSON.stringify(state.products))
      localStorage.setItem("totalAmount", JSON.stringify(state.total_amount))
    }
  }
})

export const { addProducts, removeProduct, clearCart, decrementProductQuantity } = cartSlice.actions
export const selectCartProduct = (state: RootState) => state.cartSlice.products
export const selectCartTotalAmount = (state: RootState) => state.cartSlice.total_amount as number
export default cartSlice.reducer
