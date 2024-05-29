import ProductCard from "../ProductCard/ProductCard"
import { useGetAllProductsQuery } from "../../app/services/productApi"
import "./style.css"

export default function GridProducts() {
  const {data, error} = useGetAllProductsQuery()

  if(error) {
    return <div>Error</div>
  }

  console.log(data)

  return (
    <div className="grid-container">
      <div className="grid-products">
        {data?.map((product) => (
          <ProductCard product={product} />
        ))}
      </div>
    </div>
  )
}