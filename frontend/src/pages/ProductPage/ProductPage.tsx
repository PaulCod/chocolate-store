import "./style.css"
import { useParams } from "react-router-dom"
import { useAppDispatch } from "../../app/hooks"
import { addProducts } from "../../app/features/cartSlice" 
import { useGetProductByIdQuery } from "../../app/services/productApi"
import Error404 from "../Error404/Error404"

export default function ProductPage() {
  const dispatch = useAppDispatch()


  const productId = useParams().id

  if (!productId) {
    return <Error404 />
  }

  const { data } = useGetProductByIdQuery(productId)

  if (!data) {
    return <Error404 />
  }

  

  return (
    <main className="main">
      <section className="product-container">
        <div className="product-image">
          <img src={data[0].img_url} alt="" />
        </div>

        <div className="product-data">
          <h1>{data[0].name}</h1>
          <p>{data[0].description}</p>
          

          <div className="product-footer">
            <span>{`R$${data[0].price}`}</span>
            <button className="btn-add-to-cart" onClick={() => {dispatch(addProducts(data[0]))}}>Adicionar ao carrinho</button>
          </div>
        </div>
      </section>
    </main>
  )
}