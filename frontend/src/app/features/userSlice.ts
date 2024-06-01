import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { User } from "../../types/types";

const initialState: User = {
  userId: "",
  name: "",
  email: ""
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<User>) => {

      state.userId = action.payload.userId
      state.name = action.payload.name
      state.email = action.payload.email

      localStorage.setItem("userData", JSON.stringify(state))
    },

    clearUser: (state) => {
      state.userId = ""
      state.name = ""
      state.email = ""  
      localStorage.removeItem("userData")
    }
  }
})

export const {setUserData, clearUser} = userSlice.actions
export const selectUserData = (state: RootState) => state.userSlice
export default userSlice.reducer