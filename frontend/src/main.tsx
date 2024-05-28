import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CartPage from './pages/CartPage/CartPage.tsx'
import ProfilePage from './pages/ProfilePage/ProfilePage.tsx'
import LoginPage from './pages/LoginPage/LoginPage.tsx'
import SignUp from './pages/SignUp/SignUp.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: "cart",
    element: <CartPage />
  },
  {
    path: "*",
    element: <App />
  },
  {
    path: "profile",
    element: <ProfilePage />
  },
  {
    path: "login",
    element: <LoginPage />
  },
  {
    path: "signup",
    element: <SignUp />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
