import "./style.css"
import {MagnifyingGlass} from "@phosphor-icons/react"

export default function Search() {
  return (
    <div className="search-container">
      <MagnifyingGlass className="search-icon" size={30} />
      <input placeholder="Pesquisar" className="search-input" type="search" />
    </div>
  )
}