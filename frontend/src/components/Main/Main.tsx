import "./style.css"
import Banner from "../Banner/Banner";
import SearchBar from "../Search/Search";
import GridProducts from "../GridProducts/GridProducts";


export default function Main() {
  return (
    <main className="main">
      <Banner />
      <SearchBar />
      <GridProducts />
    </main>
  )
}