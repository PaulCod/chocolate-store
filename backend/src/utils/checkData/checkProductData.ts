import { IProductData } from "../../interfaces/ProductInterfaces"

class CheckProductData {
  errors: string[] = []

  checkData(data: IProductData) {
    this.errors = []
    this.checkName(data.name)
    this.checkPrice(data.price)
    this.checkDescription(data.description)
    this.checkImgUrl(data.imgUrl)
  }

  checkName(name: string) {
    if (name.length < 3) {
      this.errors.push('Name must be at least 3 characters long')
      return
    }
  }

  checkPrice(price: number) {
    if (price <= 0) {
      this.errors.push('Price must be greater than 0')
      return
    }
  }

  checkDescription(description: string) {
    if (description.length < 6) {
      this.errors.push('Description must be at least 10 characters long')
      return
    }
  }

  checkImgUrl(imgUrl: string) {
    if (!imgUrl) {
      this.errors.push('ImgUrl is required')
      return
    }
  }

}

export default CheckProductData