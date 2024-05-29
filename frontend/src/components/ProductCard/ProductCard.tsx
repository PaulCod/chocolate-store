import "./style.css"
import { Product } from "../../types/types"

interface Props {
  product: Product
}

export default function ProductCard({product}: Props) {
  console.log(product.img_url)
  return (
    <div className="product-card" >
      <img src={product.img_url} alt="" className="img-product"/>
      <h2 className="product-title">{product.name}</h2>

      <div className="card-footer">
        <span className="product-price">R${product.price}</span>
        <button className="btn-add-to-cart" onClick={() => {}}>Add to cart</button>
      </div>
    </div>
  )
}