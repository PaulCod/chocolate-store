import { IProductData } from "../interfaces/ProductInterfaces"
import ProductModel from "./ProductModel"

describe("Product Model", () => {
  test("should create a new product", () => {
    let productData: IProductData = {
      name: 'test',
      price: 10,
      description: 'test',
      imgUrl: 'test',
      id: undefined,
      createdAt: undefined,
      updatedAt: undefined
    }

    const product = new ProductModel(productData)

    expect(product).toBeInstanceOf(ProductModel)
    expect(product.id).toBeDefined()
    expect(product.name).toBe('test')
    expect(product.price).toBe(10)
    expect(product.description).toBe('test')
    expect(product.imgUrl).toBe('test')

  })
})