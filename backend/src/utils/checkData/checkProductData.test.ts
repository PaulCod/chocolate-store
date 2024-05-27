import { IProductData } from "../../interfaces/ProductInterfaces"
import CheckProductData from "./checkProductData"

describe("checkProductData", () => {

  it("should check product data", () => {
    const checkProductData = new CheckProductData()
    const data: IProductData = {
      name: "test",
      price: 10,
      description: "test test test",
      imgUrl: "test",
      id: undefined,
      createdAt: undefined,
      updatedAt: undefined
    }
    checkProductData.checkData(data)
    expect(checkProductData.errors).toEqual([])
  })

  it("should return error for invalid product name", () => {
    const checkProductData = new CheckProductData()
    const data: IProductData = {
      name: "te",
      price: 10,
      description: "test test test",
      imgUrl: "test",
      id: undefined,
      createdAt: undefined,
      updatedAt: undefined
    }
    checkProductData.checkData(data)
    expect(checkProductData.errors).toEqual(['Name must be at least 3 characters long'])
  })

  it("should return error for invalid product price", () => {
    const checkProductData = new CheckProductData()
    const data: IProductData = {
      name: "test",
      price: 0,
      description: "test test test",
      imgUrl: "test",
      id: undefined,
      createdAt: undefined,
      updatedAt: undefined
    }
    checkProductData.checkData(data)
    expect(checkProductData.errors).toEqual(['Price must be greater than 0'])
  })

  it("should return error for invalid product description", () => {
    const checkProductData = new CheckProductData()
    const data: IProductData = {
      name: "test",
      price: 10,
      description: "test",
      imgUrl: "test",
      id: undefined,
      createdAt: undefined,
      updatedAt: undefined
    }
    checkProductData.checkData(data)
    expect(checkProductData.errors).toEqual(['Description must be at least 10 characters long'])
  })

  it("should return error for invalid product imgUrl", () => {
    const checkProductData = new CheckProductData()
    const data: IProductData = {
      name: "test",
      price: 10,
      description: "test test test",
      imgUrl: "",
      id: undefined,
      createdAt: undefined,
      updatedAt: undefined
    }
    checkProductData.checkData(data)
    expect(checkProductData.errors).toEqual(['ImgUrl is required'])
  })

})