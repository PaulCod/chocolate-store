import "./style.css"
import Banner from "../Banner/Banner";
import SearchBar from "../Search/Search";


export default function Main() {
  return (
    <main className="main">
      <Banner />
      <SearchBar />
    </main>
  )
}