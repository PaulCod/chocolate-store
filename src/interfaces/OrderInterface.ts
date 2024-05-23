interface IOrderData {
  id: string | undefined
  userId: string
  status: string
  createdAt: Date | undefined
}

interface IOrderRepository {
  save(order: IOrderData): Promise<void>
  delete(id: string): Promise<void>
  getById(id: string): Promise<IOrderData>
  getAll(): Promise<IOrderData[]>
}

interface IOrderController {
  createOrder(order: IOrderData): Promise<void>
  deleteOrder(id: string): Promise<void>
  getOrder(id: string): Promise<IOrderData>
  getOrders(idUser: string): Promise<IOrderData[]>
}

export { IOrderData, IOrderRepository, IOrderController }