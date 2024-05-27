import { IOrderItemData } from "../interfaces/OrderInterface"

class OrderItem implements IOrderItemData{
  orderId: string
  chocolateId: string
  quantity: number

  constructor(data: IOrderItemData) {
    this.orderId = data.orderId
    this.chocolateId = data.chocolateId
    this.quantity = data.quantity
  }
}

export default OrderItem