import "./style.css"

type Props = {
  title: string
  price: number
}

export default function ProductCard({title, price}: Props) {
  return (
    <div className="product-card" >
      <img src="https://picsum.photos/200/300?grayscale" alt="" className="img-product"/>
      <h2 className="product-title">{title}</h2>

      <div className="card-footer">
        <span className="product-price">R${price}</span>
        <button className="btn-add-to-cart">Add to cart</button>
      </div>
    </div>
  )
}