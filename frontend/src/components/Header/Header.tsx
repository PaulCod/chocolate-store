import "./style.css"
import { Link } from "react-router-dom"
import {ShoppingCartSimple} from "@phosphor-icons/react"
import {  useAppSelector } from "../../app/hooks"

export default function Header() {

  const selector = useAppSelector((state) => state.userSlice)

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <Link to="/">
            <h1>Logo</h1>
          </Link>
        </div>
  
        <div className="welcome-message">
          <span>{`Bem vindo ` + selector.name ?? "!"}</span>
        </div>
  
        <div className="nav-cart">
          <nav className="nav">
            <ul>
              <li><Link to="/profile">Perfil</Link></li>
            </ul>
          </nav>

          <Link to="/cart">
            <ShoppingCartSimple size={32} />
          </Link>
        </div>
      </div>
    </header>
  )
}