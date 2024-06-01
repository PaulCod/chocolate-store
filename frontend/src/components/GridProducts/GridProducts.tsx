import ProductCard from "../ProductCard/ProductCard"
import { useGetAllProductsQuery } from "../../app/services/productApi"
import "./style.css"

export default function GridProducts() {
  const {data, error} = useGetAllProductsQuery()

  if(error) {
    return <div>Error</div>
  }

  return (
    <div className="grid-container">
      <div className="grid-products">
        {data?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}