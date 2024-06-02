import './App.css'

import { Outlet} from "react-router-dom"
import Cookies from 'universal-cookie'
import {useGetUserDataByIdQuery, } from "./app/services/userApi"
import { setUserData, clearUser } from './app/features/userSlice'
import { useAppDispatch } from './app/hooks'

import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import { useEffect } from 'react'

function App() {
  const cookie = new Cookies()
  const token = cookie.get("token")
  const dispatch = useAppDispatch()

  const {data, error} = useGetUserDataByIdQuery(token, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
    skip: !token
  })

  useEffect(() => {
    document.title = "Chocolate Store"

    if(data) {
      dispatch(setUserData(data))
      return
    }

    if(error || !token) {
      dispatch(clearUser())
    }

    const userData = localStorage.getItem("userData")

    if(userData) {
      dispatch(setUserData(JSON.parse(userData)))
      return
    }

    dispatch(clearUser())
    
  }, [data, dispatch])

  return (
   <>
      <Header />
      <Outlet />
      <Footer />
   </>
  )
}

export default App
