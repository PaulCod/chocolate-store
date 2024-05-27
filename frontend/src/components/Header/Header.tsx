import "./style.css"

import {ShoppingCartSimple} from "@phosphor-icons/react"

export default function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <h1>Logo</h1>
        </div>
  
        <div className="welcome-message">
          <span>Bem vindo!</span>
        </div>
  
        <div className="nav-cart">
          <nav className="nav">
            <ul>
              <li><a href="">Perfil</a></li>
            </ul>
          </nav>

          <ShoppingCartSimple size={32} />
        </div>

        
      </div>
    </header>
  )
}