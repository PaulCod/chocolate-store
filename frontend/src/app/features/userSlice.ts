import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface User {
  id: string
  name: string
  email: string
  token: string
}

const initialState: User = {
  id: "",
  name: "",
  email: "",
  token: ""
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<User>) => {
      state.id = action.payload.id
      state.name = action.payload.name
      state.email = action.payload.email
      state.token = action.payload.token

      localStorage.setItem("userData", JSON.stringify(state))
    },

    clearToken: (state) => {
      state.token = ""
      localStorage.removeItem("userData")
    }
  }
})

export const {setUserData, clearToken} = userSlice.actions
export const selectUserData = (state: RootState) => state.userSlice
export default userSlice.reducer