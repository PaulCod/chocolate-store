import ProductCard from "../ProductCard/ProductCard"
import "./style.css"

export default function GridProducts() {
  return (
    <div className="grid-container">
      <div className="grid-products">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <ProductCard
            key={item}
            title={`Product ${item}`}
            price={item * 100}
          />
        ))}
      </div>
    </div>
  )
}