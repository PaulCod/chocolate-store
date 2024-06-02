import "./styles.css"
import { useAppDispatch, useAppSelector } from "../../app/hooks" 
import { clearCart, selectCartTotalAmount } from "../../app/features/cartSlice"
import CartItem from "./components/CartItem"
import useToken from "../../hooks/useToken"
import { Link } from "react-router-dom"

export default function CartPage() {
  const dispatch = useAppDispatch()
  const products = useAppSelector(state => state.cartSlice.products)
  const totalAmount = useAppSelector(selectCartTotalAmount)
  const token = useToken()

  console.log(totalAmount)


  return (
    <main className="main">
      <section className="cart-container">
        
        {products.length > 0 ? (
          <>
            <div className="items">
              <h1 className="cart-title">Carrinho</h1>
              {products.map((product) => (
                <CartItem key={product.id} product={product} />
              ))}
            </div>
            <div className="order-total">
              {token ? (
                <>
                  <span>Total</span>
                  <span>R${totalAmount}</span> 
                  <hr />
                  <div className="btns-cart">
                    <button className="btn-clear-cart" onClick={() => {
                      dispatch(clearCart())
                    }}>Limpar carrinho</button>
        
                    <button className="btn-finalize-order">Finalizar compra</button>
                  </div>
                </>
              ) : (
                <div>Faça
                  <Link className="link-cart" to="/login">login</Link> ou 
                  <Link to="/register" className="link-cart">cadastre-se</Link>
                  para finalizar a compra
                </div>
              )}
            </div>
          </>
        ): (
          <div>Seu carrinho esta vazio</div>
        )}
      </section>
    </main>
  )
}