import "react-toastify/ReactToastify.css"
import "./styles.css"
import { useAppDispatch, useAppSelector } from "../../app/hooks" 
import { clearCart, selectCartTotalAmount } from "../../app/features/cartSlice"
import { useCreateOrderMutation } from "../../app/services/orderApi"
import CartItem from "./components/CartItem"
import useToken from "../../hooks/useToken"
import { Link, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"

export default function CartPage() {
  const navigate = useNavigate()
  const [createOrder, {isLoading}] = useCreateOrderMutation()
  const dispatch = useAppDispatch()
  const products = useAppSelector(state => state.cartSlice.products)
  const totalAmount = useAppSelector(selectCartTotalAmount)
  const token = useToken()

  const handleCreateOrder = async () => {
    if (token) {

      const order = {
        order: {
          status: "pending",
          totalAmount
        },
        items: products.map(product => ({
          chocolateId: product.id,
          quantity: product.quantity
        }))
      }

      const response = await createOrder({order, token})

      if("error" in response) {
        toast.error((response as any).error.data.message[0])
        return
      }

      dispatch(clearCart())

      toast.success("Order created successfully")

      setTimeout(() => {
        navigate("/")
      }, 3000)

    }
  }

  return (
    <main className="main">
      <ToastContainer position="top-right" theme="colored" autoClose={3000} />
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
              <>
                <span>Total</span>
                <span>{`R$${totalAmount.toFixed(2)}`}</span> 
                <hr />
                <div className="btns-cart">
                  <button className="btn-clear-cart" onClick={() => {
                    dispatch(clearCart())
                  }}>Limpar carrinho</button>
      
                  <button className="btn-finalize-order" disabled={!token} onClick={handleCreateOrder}>Finalizar compra</button>
                </div>
                
                {!token && <div>Faça
                  <Link className="link-cart" to="/login">login</Link> ou 
                  <Link to="/register" className="link-cart">cadastre-se</Link>
                  para finalizar a compra
                </div>}
              </>
            </div>
          </>
        ): (
          <div>Seu carrinho esta vazio</div>
        )}
      </section>
    </main>
  )
}