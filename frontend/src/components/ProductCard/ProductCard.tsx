import "./style.css"
import { useAppDispatch } from "../../app/hooks"
import { addProducts } from "../../app/features/cartSlice"
import { Product } from "../../types/types"
import { Link } from "react-router-dom"

interface Props {
  product: Product
}

export default function ProductCard({product}: Props) {
  const dispatch = useAppDispatch()

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`}>
        <img src={product.img_url} alt="" className="img-product"/>
      </Link>
      <h2 className="product-title">{product.name}</h2>

      <div className="card-footer">
        <span className="product-price">R${product.price}</span>
        <button className="btn-add-to-cart" onClick={() => {
          dispatch(addProducts(product))
        }}>Add to cart</button>
      </div>
    </div>
  )
}