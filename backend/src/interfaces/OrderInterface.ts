import { Request, Response } from "express"

interface IOrderData {
  id: string | undefined
  userId: string
  status: string
  totalAmount: number
  createdAt: Date | undefined
}

interface IOrderItemData {
  orderId: string
  chocolateId: string
  quantity: number
}

interface IOrderRepository {
  save(order: IOrderData, items: IOrderItemData[]): Promise<void>
  delete(id: string): Promise<void>
  getAll(idUser: string): Promise<IFormattedOrderData[]>
}

interface IFormattedOrderData {
  name: string
  total_amount: number
  status: string
  total_quantity: number
}

interface IOrderController {
  createOrder(req: Request, res: Response): Promise<void>
  deleteOrder(req: Request, res: Response): Promise<void>
  getOrders(req: Request, res: Response): Promise<void>
}

export { IOrderData, IOrderRepository, IOrderController, IOrderItemData, IFormattedOrderData }