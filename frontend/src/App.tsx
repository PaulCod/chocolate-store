import './App.css'

import { Outlet} from "react-router-dom"
import Cookies from 'universal-cookie'
import {useGetUserDataByIdQuery} from "./app/services/userApi"
import { setUserData } from './app/features/userSlice'
import { useAppDispatch } from './app/hooks'

import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import { useEffect } from 'react'

function App() {
  const cookie = new Cookies()
  const token = cookie.get("token")
  const dispatch = useAppDispatch()

  const {data} = useGetUserDataByIdQuery(token, {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: false,
    skip: !token
  })

  useEffect(() => {
    if(data) {
      dispatch(setUserData(data))
    }
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
