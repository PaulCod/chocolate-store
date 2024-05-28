import ProductCard from "../ProductCard/ProductCard"
import "./style.css"

export default function GridProducts() {
  return (
    <div className="grid-container">
      <div className="grid-products">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  )
}