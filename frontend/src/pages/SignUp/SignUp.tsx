import "./styles.css"
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify"
import SignUpForm from "./components/SingUpForm"
import "./styles.css"

export default function SignUp() {
  return (
    <main className="main">
      <ToastContainer />
      <section className="register-container">
       
        <SignUpForm />
      </section>
    </main>
  )
}