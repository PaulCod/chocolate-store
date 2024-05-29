import "react-toastify/dist/ReactToastify.css"
import "./styles.css"
import Cookies from "universal-cookie"
import { Link } from "react-router-dom"
import {useNavigate} from 'react-router-dom'
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {z} from 'zod'
import {toast, ToastContainer} from 'react-toastify'
import { useLoginMutation } from "../../app/services/loginApi"


const loginSchema = z.object({
  email: z.string().min(1, {message: "Email is required"}).email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters")
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginPage() {
  const [loginMutation, {isLoading}] = useLoginMutation()

  const {register, handleSubmit, formState: {errors}} = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  })

  const cookie = new Cookies()

  const navigate = useNavigate()

  async function handleLogin(loginData: LoginFormData) {
    
    try {
      const response = await loginMutation(loginData);
      if("error" in response) {
        toast.error((response as any).error.data.message[0])
        return
      }

      toast.success("Login successful")

      const {token} = response.data

      cookie.set("token", token, {path: "/", secure: true}) 

      navigate("/")
      
    } catch(error) {
      console.log(error)
    } 
  }

  return (
    <main className="login-page">
      <ToastContainer position="top-right" theme="colored" autoClose={3000} />
      <img className="image-login" src="../../../public/chocolate-login.jpg" alt="" />
      <div className="login">
        <section className="login-section">
          <h1>Login</h1>
          <form className="login-form" onSubmit={handleSubmit(handleLogin)}>
            <div className="input-container">
              <input {...register("email")} type="email" placeholder="Email" />
              {errors.email && <span className="error-message">{errors.email.message}</span>}
            </div>

            <div className="input-container">
              <input {...register("password") } type="password" placeholder="Password" />
              {errors.password && <span className="error-message">{errors.password.message}</span>}
            </div>

            <Link to="/products">Forgot password?</Link>

            <button disabled={isLoading} className="btn-login" type="submit">Login</button>
          </form>
        </section>
      </div>
    </main>
  )
}