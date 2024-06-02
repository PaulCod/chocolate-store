import { Product } from "../../../types/types";
import {addProducts, decrementProductQuantity} from "../../../app/features/cartSlice"
import { useAppDispatch } from "../../../app/hooks";

interface Props {
  product: Product
}

export default function CartItem({product}: Props) {
  const dispatch = useAppDispatch()

  console.log(product)

  return (
    <section className="cart-item">
      <div className="image-cart-item">
        <img src={product.img_url} alt="" />
      </div>

      <div className="cart-item-data">
        <h3>{product.name}</h3>
        <p>{product.description}</p>

        <div className="cart-item-quantity">
          <button onClick={() => dispatch(decrementProductQuantity(product.id))}>-</button>
          <span>{product.quantity}</span>
          <button onClick={() =>  dispatch(addProducts(product))}>+</button>
        </div>
      </div>
    </section>
  )
}