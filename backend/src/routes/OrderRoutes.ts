import { Router } from "express";
import { IOrderController } from "../interfaces/OrderInterface";
import AuthUserMiddleware from "../middlewares/AuthUser";

class OrderRoutes {
  router: Router
  orderController: IOrderController
  authUserMiddleware: AuthUserMiddleware

  constructor(orderController: IOrderController) {
    this.router = Router()
    this.orderController = orderController
    this.authUserMiddleware = new AuthUserMiddleware()
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.post('/orders', this.authUserMiddleware.authUser.bind(this.authUserMiddleware), this.orderController.createOrder.bind(this.orderController));
    this.router.delete('/orders/:id', this.authUserMiddleware.authUser.bind(this.authUserMiddleware), this.orderController.deleteOrder.bind(this.orderController));
    this.router.get('/orders', this.authUserMiddleware.authUser.bind(this.authUserMiddleware), this.orderController.getOrders.bind(this.orderController));
  }
}

export default OrderRoutes