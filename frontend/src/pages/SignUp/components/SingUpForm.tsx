import {z} from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useCreateUserMutation } from "../../../app/services/userApi"
import { toast } from "react-toastify"
import { Link, useNavigate } from "react-router-dom"

const signupSchema = z.object({
  name: z.string().min(2, {message: "Name must be at least 2 characters"}),
  email: z.string().min(1, {message: "Email is required"}).email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters")
})

type SignUpFormData = z.infer<typeof signupSchema>

export default function SignUpForm() {
  const [createUserMutation, {isLoading}] = useCreateUserMutation()

  const {register, handleSubmit, formState: {errors}} = useForm<SignUpFormData>({
    resolver: zodResolver(signupSchema)
  })

  const navigate = useNavigate()

  const handleCreateUser = async (data: SignUpFormData) => {
    try {
      const response = await createUserMutation(data)

      if("error" in response) {
        console.log(response)
        toast.error((response as any).error.data.message[0])
        return
      }

      toast.success("User created successfully")

      navigate("/login")
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <form className="register-form" onSubmit={handleSubmit(handleCreateUser)} >
       <h1>Criar conta</h1>
      <div className="input-container">
        <input {...register("name")} type="text" placeholder="Name" />
        {errors.name && <span className="error-message">{errors.name.message}</span>}
      </div>
      <div className="input-container">
        <input {...register("email")} type="email" placeholder="Email" />
        {errors.email && <span className="error-message">{errors.email.message}</span>}
      </div>
      <div className="input-container">
        <input {...register("password")} type="password" placeholder="Password" />
        {errors.password && <span className="error-message">{errors.password.message}</span>}
      </div>
      <button type="submit" disabled={isLoading} >{isLoading ? "Loading..." : "Sign Up"}</button>
      <Link style={{marginTop: "1rem", display: "block", color: "black"}} to="/login">Already have an account?</Link>
    </form>
  )
}