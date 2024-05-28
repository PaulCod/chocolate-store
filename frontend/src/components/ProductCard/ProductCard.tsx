import "./style.css"

export default function ProductCard() {
  return (
    <div className="product-card">
      <img src="https://picsum.photos/200/300?grayscale" alt="" className="img-product"/>
      <h2 className="product-title">Product</h2>

      <div className="card-footer">
        <span className="product-price">R$0.00</span>
        <button className="btn-add-to-cart">Add to cart</button>
      </div>
    </div>
  )
}