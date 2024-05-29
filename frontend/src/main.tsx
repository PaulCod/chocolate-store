import './index.css'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {Provider} from "react-redux"
import {store} from "./app/store.ts"
import App from './App.tsx'
import CartPage from './pages/CartPage/CartPage.tsx'
import ProfilePage from './pages/ProfilePage/ProfilePage.tsx'
import LoginPage from './pages/LoginPage/LoginPage.tsx'
import SignUp from './pages/SignUp/SignUp.tsx'
import ProductPage from './pages/ProductPage/ProductPage.tsx'
import Main from './components/Main/Main.tsx'
import Error404 from './pages/Error404/Error404.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {path: "", element: <Main />},
      { path: 'cart', element: <CartPage /> },
      { path: 'product/:id', element: <ProductPage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "*", element: <Error404 /> }
    ]
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
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
