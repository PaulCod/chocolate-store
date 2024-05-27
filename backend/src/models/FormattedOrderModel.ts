import { IFormattedOrderData } from "../interfaces/OrderInterface"

class FormmattedOrderModel implements IFormattedOrderData {
  name: string
  total_amount: number
  status: string
  total_quantity: number
  
  constructor(data: IFormattedOrderData) {
    this.name = data.name
    this.total_amount = data.total_amount
    this.status = data.status
    this.total_quantity = data.total_quantity
  }
}

export default FormmattedOrderModel