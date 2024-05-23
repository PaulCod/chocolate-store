import { IOrderData } from "../interfaces/OrderInterface";
import { v4 as uuidv4 } from 'uuid'

class Order implements IOrderData {
  id: string | undefined;
  userId: string;
  status: string;
  createdAt: Date | undefined;

  constructor(data: IOrderData) {
    this.id = data.id ?? uuidv4()
    this.userId = data.userId
    this.status = data.status
    this.createdAt = data.createdAt
  }
}

export default Order