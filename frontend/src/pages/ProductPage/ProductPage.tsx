import { useParams } from "react-router-dom"

export default function ProductPage() {
  const productId = useParams().id

  return (
    <main className="main">
      <h1>ProductPage</h1>
      
      <h2>{productId}</h2>
    </main>
  )
}