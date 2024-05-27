import { IProductData } from "../interfaces/ProductInterfaces"
import { v4 as uuidv4 } from 'uuid';

class ProductModel implements IProductData {
  id: string | undefined
  name: string
  description: string
  price: number
  imgUrl: string
  createdAt: Date | undefined
  updatedAt: Date | undefined
  constructor(data: IProductData) {
    this.id = data.id ?? uuidv4()
    this.name = data.name
    this.description = data.description
    this.price = data.price
    this.imgUrl = data.imgUrl
    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
  }
}


export default ProductModel