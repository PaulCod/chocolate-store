interface User {
  userId: string
  name: string
  email: string
}

interface Product {
  id: string
  name: string
  description: string
  price: number
  img_url: string
  quantity: number
}

export type {User, Product}