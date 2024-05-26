import { Router } from "express";
import { IOrderController } from "../interfaces/OrderInterface";

class OrderRoutes {
  router: Router
  orderController: IOrderController

  constructor(orderController: IOrderController) {
    this.router = Router()
    this.orderController = orderController
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.post('/orders', this.orderController.createOrder.bind(this.orderController));
    this.router.delete('/orders/:id', this.orderController.deleteOrder.bind(this.orderController));
    this.router.get('/orders', this.orderController.getOrders.bind(this.orderController));
  }
}

export default OrderRoutes